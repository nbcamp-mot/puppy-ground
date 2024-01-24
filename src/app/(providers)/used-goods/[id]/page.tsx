'use client';

import { deleteUsedGood, updateUsedGood } from '@/apis/used-goods/actions';
import ClipBoardButton from '@/app/_components/shareButton/ClipBoardButton';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';
import { supabase } from '@/shared/supabase/supabase';
import styles from './page.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { getCountFromTable } from '@/utils/table';
import { getformattedDate } from '@/utils/time';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { SlideImage, TradeLocationMap } from '../_components';
import ChatList from '@/app/_components/chatting/ChatList';
import { useState } from 'react';
import { getChatRoomList, makeChatList } from '@/apis/chat/chat';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { addCommasToNumber } from '@/utils/format';
import { Tables } from '@/shared/supabase/types/supabase';

const getUsedGoodDetail = async (id: string) => {
  const { data, error } = await supabase
    .from('used_item')
    .select(
      `*, profiles ( * ), main_category ( name ), sub_category ( name ), used_item_wish ( count ), chat_list ( count )`
    )
    .eq('id', id)
    .single();

  return data;
};

const UsedGoodsDetail = ({ params }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user);
  const { id } = useParams();
  const { errorTopRight } = useToast();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['used-item', params.id],
    queryFn: () => getUsedGoodDetail(params.id)
  });

  const { data: chatList } = useQuery({
    queryKey: ['chatRoom'],
    queryFn: () => getChatRoomList(user!.id)
  });

  const onClickUpdateSoldOut = async () => {
    if (user?.id !== data?.user_id) {
      errorTopRight({ message: '본인의 상품만 판매완료 처리할 수 있습니다.' });
      return;
    }
    Swal.fire({
      title: '판매완료 처리하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: `네`,
      denyButtonText: `아니오`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await updateUsedGood(Number(params.id), { sold_out: true });

        if (error) {
          Swal.fire({
            title: '판매완료 처리에 실패했습니다.',
            icon: 'error'
          });
          return;
        }

        Swal.fire({
          title: '판매완료 처리되었습니다.',
          icon: 'success'
        });

        queryClient.invalidateQueries({ queryKey: ['used-item', params.id] });
      }
    });
  };

  async function deleteImage(photo_url: string) {
    const file = photo_url.split('/').pop();
    if (!file) return;

    const { error } = await supabase.storage.from('used_goods').remove([file]);
    if (error) {
      errorTopRight({ message: error.message });
    }
  }

  const router = useRouter();

  const onClickDelete = () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '입력하신 정보가 모두 사라집니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        data?.photo_url.map((photo_url) => deleteImage(photo_url));
        deleteUsedGood(Number(params.id));
        router.push('/used-goods');
      } else return;
    });
  };

  const makeChatListMutation = useMutation({
    mutationFn: makeChatList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoom'] });
    }
  });

  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [chatListData, setChatListData] = useState<Tables<'chat_list'>>();
  //채팅하기 한번만 할 수 있는.. 눈속임 state(?)
  // const [userChatList, setUserChatList] = useState(false);

  // const list = chatList?.getChatListData?.filter((chat) => chat?.post_id === Number(id));

  const clickOpenChat = async () => {
    // const findUserChatList = list?.filter((chat) => chat.user_id === user?.id);

    // if (userChatList === true || findUserChatList !== undefined)
    //   return errorTopRight({ message: '이미 채팅을 보냈습니다', timeout: 2000 });

    try {
      const chat = await makeChatListMutation.mutateAsync({
        post_id: data?.id,
        user_id: user?.id,
        other_user: data?.user_id
      });
      if (!chat) return;
      setChatListData(chat);
      setModalIsOpen(true);
      // setUserChatList(true);
    } catch (error) {
      errorTopRight({ message: '오류가 발생하였습니다', timeout: 2000 });
    }
  };

  if (isLoading) return <span>LOADING</span>;
  if (!data) return null;

  const {
    created_at,
    title,
    content,
    price,
    profiles,
    photo_url,
    longitude,
    latitude,
    place_name,
    main_category,
    sub_category,
    used_item_wish,
    sold_out
  } = data;

  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <div className={styles.product}>
          <div className={styles.imageContainer}>
            <SlideImage images={photo_url} />
          </div>
          <div className={styles.details}>
            <div>
              <div className={styles.info}>
                <h3 title={title}>{title}</h3>
                <span className={styles.price}>{addCommasToNumber(price)}원</span>
              </div>
              <div className={styles.profile}>
                {profiles && (
                  <Image src={profiles.avatar_url!} alt="profile image" width={40} height={40} />
                )}

                <span>{profiles?.user_name}</span>
              </div>
              <div className={styles.moreInfo}>
                <time>{getformattedDate(created_at, 'YY년 MM월 DD일')}</time>
                {sold_out ? (
                  <div>
                    <span className={styles.tag}>#{main_category!.name}</span>
                    <span className={styles.tag}>#{sub_category!.name}</span>
                    <span className={styles.soldOut}>#판매완료</span>
                  </div>
                ) : (
                  <div>
                    <span className={styles.tag}>#{main_category!.name}</span>
                    <span className={styles.tag}>#{sub_category!.name}</span>
                  </div>
                )}
              </div>
            </div>
            {/* TODO: 채팅, 찜 기능 동작 */}
            <div className={styles.btns}>
              <button onClick={clickOpenChat}>채팅하기</button>
              <ChatList
                isOpen={isModalOpen}
                onClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                isChatRoomOpen={true}
                list={chatListData}
              />
              <button>찜 {getCountFromTable(used_item_wish)}</button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.mid}>
        <div className={styles.header}>
          <h3>제품 상세 설명</h3>
        </div>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </section>
      <section className={styles.bottom}>
        <div className={styles.header}>
          <h3>거래 희망 장소</h3>
          <p>
            <FaMapMarkerAlt />
            {place_name}
          </p>
        </div>
        <div className={styles.content}>
          <TradeLocationMap lat={latitude} lng={longitude} />
        </div>
        {/* TODO: SNS 공유, 링크 복사 */}
        <KakaoShareButton />
        <ClipBoardButton />
        {/* 버튼 생기면 옮겨 주세요 */}
        {sold_out ? null : <button onClick={onClickUpdateSoldOut}>sold-out</button>}
        <button onClick={onClickDelete}>delete</button>
      </section>
    </main>
  );
};

export default UsedGoodsDetail;

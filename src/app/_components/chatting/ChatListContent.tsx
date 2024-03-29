import { Tables } from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import styles from './chatListContent.module.scss';
import { RiLogoutBoxLine } from 'react-icons/ri';

type PropsType = {
  chat: Tables<'chat_list'>;
  clickChatRoom: ({
    id,
    other_user,
    usedItem
  }: {
    id: number;
    other_user: string;
    usedItem: Tables<'used_item'>;
  }) => void;
  userProfile: string;
  clickOutChatRoom: ({ userId, chatListId }: { userId: string; chatListId: number }) => void;
};

const ChatListContent = ({
  chat: chatList,
  clickChatRoom,
  userProfile,
  clickOutChatRoom
}: PropsType) => {
  return (
    <>
      {!!chatList.get_out_chat_room ? (
        <>
          {chatList.get_out_chat_room[0] !== userProfile &&
            chatList.get_out_chat_room[1] !== userProfile && (
              <li className={styles.chatList} key={chatList.id}>
                <div
                  onClick={() =>
                    clickChatRoom({
                      id: chatList.id,
                      other_user:
                        userProfile !== chatList.other_user
                          ? chatList.other_user
                          : chatList.user_id,
                      usedItem: chatList.used_item
                    })
                  }
                  className={styles.chatContent}
                >
                  <div>
                    <Image
                      width={50}
                      height={50}
                      src={`${chatList.used_item.photo_url[0]}`}
                      alt="물건 사진"
                    />
                    <p>{chatList.used_item.title}</p>
                  </div>
                </div>
                <div className={styles.wastebaseket}>
                  <span
                    onClick={() =>
                      clickOutChatRoom({ userId: userProfile, chatListId: chatList.id })
                    }
                  >
                    <RiLogoutBoxLine color={'#0AC4B9'} />
                  </span>
                </div>
              </li>
            )}
        </>
      ) : (
        <li className={styles.chatList} key={chatList.id}>
          <div
            onClick={() =>
              clickChatRoom({
                id: chatList.id,
                other_user:
                  userProfile !== chatList.other_user ? chatList.other_user : chatList.user_id,
                usedItem: chatList.used_item
              })
            }
            className={styles.chatContent}
          >
            <div>
              <Image
                width={50}
                height={50}
                src={`${chatList.used_item.photo_url[0]}`}
                alt="물건 사진"
              />
              <p>{chatList.used_item.title}</p>
            </div>
          </div>
          <div className={styles.wastebaseket}>
            <span
              onClick={() => clickOutChatRoom({ userId: userProfile, chatListId: chatList.id })}
            >
              <RiLogoutBoxLine color={'#0AC4B9'} />
            </span>
          </div>
        </li>
      )}
    </>
  );
};

export default ChatListContent;

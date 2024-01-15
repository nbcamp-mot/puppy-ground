'use client';

import { createUsedGood } from '@/apis/used-goods/actions';
import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { TbCameraCog } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import styles from './create.module.scss';

const bucketName = 'used_goods';
const MAINCATEGORY = ['대형견', '중형견', '소형견'];
const SUBCATEGORY = ['장난감', '식품', '의류', '기타'];

const CreateForm = () => {
  const [inputForm, setInputForm] = useState<TablesInsert<'used_item'>>({
    title: '',
    address: '',
    content: '',
    latitude: 0,
    longitude: 0,
    main_category_id: 0,
    sub_category_id: 0,
    photo_url: [],
    place_name: '',
    price: 0,
    sold_out: false,
    user_id: ''
  });

  async function dropImage(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files?.length ? e.dataTransfer?.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  }

  async function addImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.length ? e.target.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  }

  async function uploadImage(file: File) {
    if (inputForm.photo_url.length >= 4) {
      // 토스티파이 변경 예정
      alert('이미지는 4개까지만 등록 가능합니다.');
      return;
    }
    if (file.size >= 2000000) {
      // 토스티파이 변경 예정
      alert('파일 사이즈가 너무 큽니다. (2MB 이하)');
      return;
    }

    const { data, error } = await supabase.storage.from('used_goods').upload(uuidv4(), file);

    if (data) {
      setInputForm((prev) => ({
        ...prev,
        photo_url: [
          ...prev.photo_url,
          `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/${bucketName}/${data.path}`
        ]
      }));
    } else {
      // 토스티파이 변경 예정
      alert(error?.message);
    }
  }

  const handleFormChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const removeImage = (index: number) => {
    setInputForm((prev) => ({
      ...prev,
      photo_url: prev.photo_url.filter((_, i) => i !== index)
    }));
  };

  const router = useRouter();

  const onClickCancel = () => {
    // 스윗얼럿 변경 예정
    if (confirm('정말 취소하시겠습니까?')) {
      router.push('/used-goods');
    } else return;
  };

  const onClickCreate = () => {
    // 토스티파이 변경 예정
    if (!inputForm.title) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!inputForm.content) {
      alert('내용을 입력해주세요');
      return;
    }
    if (!inputForm.price) {
      alert('가격을 입력해주세요');
      return;
    }
    if (!inputForm.main_category_id) {
      alert('견종 크기를 선택해주세요');
      return;
    }
    if (!inputForm.sub_category_id) {
      alert('카테고리를 선택해주세요');
      return;
    }
    if (!inputForm.photo_url || !inputForm.photo_url.length) {
      alert('사진을 선택해주세요');
      return;
    }
    if (!inputForm.place_name) {
      alert('위치를 입력해주세요');
      return;
    }
    createUsedGood(inputForm);
    // 스윗얼럿 변경 예정
    if (confirm('등록하시겠습니까?')) {
      router.push('/used-goods');
    } else return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.imageBox}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={styles.imageInput} key={index}>
              {inputForm.photo_url[index] ? (
                <>
                  {index === 0 ? <div className={styles.mainImage}>대표</div> : null}
                  <div className={styles.cancelIcon} onClick={() => removeImage(index)}>
                    <MdOutlineCancel size={20} />
                  </div>
                  <Image
                    src={inputForm.photo_url[index] || ''}
                    alt="image"
                    width={200}
                    height={200}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="file" onDragOver={(e) => e.preventDefault()} onDrop={dropImage}>
                    <TbCameraCog size={27} />
                  </label>
                  <input id="file" type="file" accept=".gif, .jpg, .png" onChange={addImage} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.contentBox}>
          <input
            className={styles.input}
            placeholder="제목"
            name="title"
            onChange={handleFormChange}
          />
          <textarea
            className={styles.textarea}
            placeholder="제품 설명을 자세히 작성해주세요"
            name="content"
            onChange={handleFormChange}
          />
          <input
            className={styles.price}
            placeholder="가격"
            name="price"
            onChange={handleFormChange}
          />
          <div className={styles.category}>
            {MAINCATEGORY.map((category, index) => (
              <div className={styles.radio} key={index}>
                <input
                  type="radio"
                  name="main_category_id"
                  value={index + 1}
                  onChange={handleFormChange}
                />
                <label htmlFor="main_category_id">{category}</label>
              </div>
            ))}
          </div>
          <div className={styles.category}>
            {SUBCATEGORY.map((category, index) => (
              <div className={styles.radio} key={index}>
                <input
                  type="radio"
                  name="sub_category_id"
                  value={index + 1}
                  onChange={handleFormChange}
                />
                <label htmlFor="sub_category_id">{category}</label>
              </div>
            ))}
          </div>
          <div className={styles.location}>
            <input
              className={styles.locationInput}
              placeholder="상세주소"
              name="place_name"
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={onClickCreate}>
              등록하기
            </button>
            <button className={styles.button} onClick={onClickCancel}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
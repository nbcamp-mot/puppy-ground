'use client';
import { supabase } from '@/shared/supabase/supabase';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';

export type Inputs = {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  image: any;
};

const SignUp = () => {
  const setUser = useAuth((state) => state.setUser);
  const [previewImg, setPreviewImg] = useState<string>(
    'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
  );
  const { successTopRight, errorTopRight } = useToast();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' });
  const router: AppRouterInstance = useRouter();
  const ref = useRef<React.HTMLInputTypeAttribute>();
  ref.current = watch('password');
  const image = watch('image');

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

  useEffect(() => {
    if (image && image.length > 0) {
      const imageFile = image[0];
      setPreviewImg(URL.createObjectURL(imageFile));
    }
  }, [image]);

  // 이메일 회원가입
  const signUpOnSubmitHandler = async (data: Inputs) => {
    let imgUrl = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png';
    if (data.image[0]) {
      const { data: imgData, error } = await supabase.storage
        .from('profile_avatar')
        .upload(`profile/${Date.now()}_${Math.floor(Math.random() * 1000)}`, data.image[0]);

      const { data: url } = supabase.storage
        .from('profile_avatar')
        .getPublicUrl(`${imgData!.path}`);
      console.log('유알엘', url.publicUrl);
      imgUrl = url.publicUrl;
    }
    const { data: loginData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.nickname,
          avatar_url: imgUrl
        }
      }
    });
    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
    if (loginData.user !== null) {
      successTopRight({ message: '회원가입 되었습니다', timeout: 2000 });
      setUser(loginData.user);
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(signUpOnSubmitHandler)}>
      <input
        placeholder="이메일을 입력하세요"
        {...register('email', { required: true, pattern: emailRegex })}
      />
      {errors.email?.type === 'required' && <p className={styles.validP}>이메일을 입력해주세요</p>}
      {errors.email?.type === 'pattern' && (
        <p className={styles.validP}>이메일 양식에 맞게 입력해주세요</p>
      )}
      <br />
      <input
        placeholder="닉네임을 입력하세요"
        {...register('nickname', { required: true, maxLength: 8 })}
        maxLength={8}
      />
      {errors.nickname?.type === 'required' && (
        <p className={styles.validP}>닉네임을 입력해주세요</p>
      )}
      {errors.nickname?.type === 'maxLength' && (
        <p className={styles.validP}>닉네임은 최대 8자까지 입력 가능합니다.</p>
      )}
      <br />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        {...register('password', { required: true, minLength: 8, pattern: passwordRegex })}
      />
      {errors.password?.type === 'required' && (
        <p className={styles.validP}>비밀번호를 입력해주세요</p>
      )}
      {errors.password?.type === 'pattern' && (
        <p className={styles.validP}>
          비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다
        </p>
      )}
      {errors.password?.type === 'minLength' && (
        <p className={styles.validP}>
          비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다
        </p>
      )}
      <br />
      <input
        type="password"
        placeholder="비밀번호 확인"
        {...register('password_confirm', {
          required: true,
          validate: (value) => value === ref.current
        })}
      />
      {errors.password_confirm?.type === 'required' && (
        <p className={styles.validP}>비밀번호를 입력해주세요</p>
      )}
      {errors.password_confirm?.type === 'validate' && (
        <p className={styles.validP}>비밀번호가 일치하지 않습니다</p>
      )}
      <br />

      <img alt="이미지 없음" className={styles.previewImg} src={previewImg} />
      <label htmlFor="preview">
        <input
          className={styles.imageInput}
          type="file"
          accept="image/*"
          id="preview"
          {...register('image')}
        />
      </label>
      <br />
      <button>회원가입</button>
      <p>
        이미 회원이신가요?
        <span
          className={styles.moveLogin}
          onClick={() => {
            router.push('/auth/login');
          }}
        >
          로그인 하러가기
        </span>
      </p>
    </form>
  );
};

export default SignUp;
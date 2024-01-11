'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Chat from '../chatting/Chat';

const Header = () => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Image src="/logo.png" alt="logo" width={90} height={60} />
        <Link href="/" className={styles.logoText}>
          Puppy Ground
        </Link>
      </div>
      <div className={styles.menuBox}>
        <Link className={styles.menuItem} href="/used-goods">
          중고거래
        </Link>
        <Link className={styles.menuItem} href="/stray-dogs">
          유기견
        </Link>
        <Link className={styles.menuItem} href="/facilities">
          동반시설
        </Link>
        <Link className={styles.menuItem} href="/mungstagram">
          멍스타그램
        </Link>
        <div className={styles.menuItem}>
          <button onClick={() => setModalIsOpen(true)}>채팅</button>
          <Chat isOpen={isModalOpen} onClose={() => setModalIsOpen(false)} ariaHideApp={false} />
        </div>
        <div className={styles.menuItem}>알람</div>
        <Link className={styles.menuItem} href="/profile">
          마이페이지
        </Link>
        <Link className={styles.menuItem} href="/auth/signup">
          회원가입
        </Link>
        <Link className={styles.menuItem} href="/auth/login">
          로그인
        </Link>
        <div className={styles.menuItem}>로그아웃</div>
      </div>
    </div>
  );
};

export default Header;


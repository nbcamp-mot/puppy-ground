'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import styles from './page.module.scss';
import { getMungstaPosts } from '@/apis/mung-stagram/action';

const MungstaPosts = () => {
  const { data: posts } = useQuery({
    queryKey: ['mungstagram'],
    queryFn: getMungstaPosts
  });

  return (
    <div className={styles.mungstaList}>
      {posts?.map((post) => {
        return (
          <div className={styles.mungstaItem} key={post.id}>
            <Link href={`/mungstagram/${post.id}`} scroll={false}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src={`${post.profiles!.avatar_url}`}
                    alt="avatar image"
                    width="40"
                    height="40"
                  />
                  <span>{post.profiles!.user_name}</span>
                </div>
                {/* TODO: 추가 작업 버튼 */}
                {/* <div>
                        <IoIosMore />
                      </div> */}
              </div>
              <div className={styles.images}>
                <Image
                  src={`${post.photo_url[0]}`}
                  alt="게시글 이미지"
                  width="270"
                  height="270"
                  priority
                />
              </div>
              <div className={styles.info}>
                <h3>{post.title}</h3>
                <div>
                  <ul>{post.tags && post.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
                </div>
                <p>{post.content}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MungstaPosts;

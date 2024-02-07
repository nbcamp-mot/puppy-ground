import { getMungstaPosts } from '@/apis/mung-stagram/action';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/_components/lib/getQueryClient';
import MungstaPosts from './_components/root/MungstaPosts';
import { Main } from '@/app/_components/layout';
import Link from 'next/link';
import styles from './page.module.scss';

export const revalidate = 0;

const MungstaMainPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['mungstagram'],
    queryFn: getMungstaPosts
  });

  return (
    <Main>
      <div className={styles.header}>
        <h2>멍스타그램</h2>
        <Link href="/mungstagram/create">등록하기</Link>
      </div>
      <section className={styles.mungstagram}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MungstaPosts />
        </HydrationBoundary>
      </section>
    </Main>
  );
};

export default MungstaMainPage;

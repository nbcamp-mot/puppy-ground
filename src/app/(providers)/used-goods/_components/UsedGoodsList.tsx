'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import styles from './usedGoodsList.module.scss';
import { useQueryParam } from '@/hooks/useQueryParam';
import { getQueryKey, getQueryFunction } from '@/apis/goods';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const UsedGoodsList = () => {
  const { queryObject, generateQueryParameter } = useQueryParam();

  const searchParams = useSearchParams();
  const { data } = useQuery({
    queryKey: getQueryKey(queryObject),
    queryFn: getQueryFunction(queryObject)
  });
  const pageNumbers = Array.from({ length: 5 }, (_, index) => index + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const current = searchParams.get('page');
    if (!current) return setCurrentPage(1);
    // TODO: 숫자 아닌 값 방지
    setCurrentPage(Number(current));
  }, [searchParams]);

  return (
    <>
      <div className={styles.wrapper}>
        {/*  TODO: Empty Component 만들기 */}
        {!data || (!data.length && <div>상품이 없습니다.</div>)}
        {data?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
      </div>
      {/* TODO: 페이지네이션 컴포넌트 분리*/}
      <div className={styles.pagination}>
        {pageNumbers.map((number, idx) => (
          <Link
            key={number}
            href={`${generateQueryParameter('page', number + '')}`}
            className={idx + 1 == currentPage ? styles.isActive : undefined}
          >
            <button onClick={() => handlePageChange(number)}>{number}</button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UsedGoodsList;

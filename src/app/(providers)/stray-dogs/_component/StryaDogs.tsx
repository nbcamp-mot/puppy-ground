'use client';

import { getStrayList } from '@/apis/stray';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '@/app/_components/layout/loading/Loading';
import regionList from '../../../../data/regionList.json';
import { CiSearch } from 'react-icons/ci';
import Pagination from '@/app/_components/pagination/Pagination';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import NoSearchValue from './NoSearchValue';
import { Main } from '@/app/_components/layout';
import { useCityAndGu } from '@/hooks/stray-dog/useCityAndGu';
import useFilterStrayList from '@/hooks/stray-dog/useStrayListFilter';
import Error from './Error';

const StrayDogs = () => {
  const { selectCity, selectGu, cityChangeHandler, guChangeHandler } = useCityAndGu();
  const [startDate, setStartDate] = useState(new Date('2023-10-01'));
  const [endDate, setEndDate] = useState(new Date());

  const {
    isLoading,
    isError,
    data: strayList
  } = useQuery<StrayList[]>({
    queryKey: ['strayList'],
    queryFn: getStrayList,
    refetchOnWindowFocus: false,
    staleTime: 3000
  });

  useEffect(() => {
    if (strayList) {
      setFilteredStrayList(strayList);
    }
  }, [strayList]);

  const filterNeedData = {
    strayList,
    selectCity,
    selectGu,
    startDate,
    setStartDate,
    endDate,
    setEndDate
  };
  // 필터링 커스텀 훅
  const { limit, offset, page, setPage, filterList, setFilteredStrayList, filteredStrayList } =
    useFilterStrayList(filterNeedData);

  // 시/구
  const selectRegion = regionList.find((region) => region.city === selectCity);
  const guList = selectRegion ? selectRegion.gu : [];

  // 필터링
  const handeFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterStrayList = filterList();
    setFilteredStrayList(filterStrayList);
    setPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Main>
      <form onSubmit={handeFilter} className={styles.filterWrap}>
        <div className={styles.filterContent}>
          <p>기간</p>
          <div className={styles.calender}>
            <DatePicker
              locale={ko}
              className={styles.datePicker}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              minDate={new Date('2023-10-01')} // minDate 이전 날짜 선택 불가
              maxDate={new Date()} // maxDate 이후 날짜 선택 불가
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date!)}
            />

            <DatePicker
              className={styles.datePicker}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date('2025-01-01')} // maxDate 이후 날짜 선택 불가
              onChange={(date) => setEndDate(date!)}
            />
          </div>
        </div>
        <div className={styles.filterContent}>
          <p>지역</p>
          <div className={styles.region}>
            <div className={styles.regionWrapper}>
              <select name="지역" className={styles.selectCity} onChange={cityChangeHandler}>
                {regionList.map((region, index) => {
                  return <option key={index}>{region.city}</option>;
                })}
              </select>
              <select
                name="시/군/구"
                className={styles.selectCity}
                onChange={guChangeHandler}
                value={selectGu}
              >
                {guList?.map((gu, index) => {
                  return <option key={index}>{gu}</option>;
                })}
              </select>
            </div>
            <button className={styles.searchButton} type="submit">
              <CiSearch size="1.2rem" />
            </button>
          </div>
        </div>
      </form>
      <div className={styles.gridContainer}>
        {filteredStrayList?.length === 0 ? (
          <NoSearchValue />
        ) : (
          filteredStrayList?.slice(offset, offset + limit).map((list, index) => {
            const formatHappenDt = dayjs(list.happenDt).format('YYYY[년] MM[월] DD[일]');
            return (
              <div key={index}>
                <Link href={`/stray-dogs/${list.desertionNo}`}>
                  <div className={styles.listCard}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={list.popfile}
                        alt="dog-image"
                        className={styles.image}
                        width="273"
                        height="273"
                      />
                    </div>
                    <div className={styles.explanationWrap}>
                      <div className={styles.titleColumn}>
                        <p>구조일시</p>
                        <p>견종</p>
                        <p>성별</p>
                        <p>발견장소</p>
                      </div>
                      <div className={styles.contentColumn}>
                        <p>{formatHappenDt}</p>
                        <p>{list.kindCd.slice(3)}</p>
                        <p>{list.sexCd === 'M' ? '수컷' : '암컷'}</p>
                        <p>{list.happenPlace}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        total={filteredStrayList ? filteredStrayList.length : strayList?.length}
      />
    </Main>
  );
};

export default StrayDogs;

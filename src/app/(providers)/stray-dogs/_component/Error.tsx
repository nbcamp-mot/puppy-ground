import React from 'react';
import styles from './Error.module.scss';
import { Main } from '@/app/_components/layout';

function Error() {
  return (
    <Main>
      <div className={styles.div}>
        <p>🙇🏻‍♀️오류가 발생하였습니다🙇🏻‍♀️</p>
        <p>다시 시도해주세요</p>
      </div>
    </Main>
  );
}

export default Error;

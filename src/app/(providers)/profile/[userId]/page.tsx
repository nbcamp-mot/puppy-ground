import Profile from '../_components/Profile';
import List from '../_components/List';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.title}>
          <h2>마이페이지</h2>
        </div>
        <Profile />
      </div>
      <div className={styles.left}>
        <List />
      </div>
    </div>
  );
};

export default Page;

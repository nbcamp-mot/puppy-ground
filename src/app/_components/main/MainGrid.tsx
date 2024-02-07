'use client';

import Image from 'next/image';
import styles from './mainGrid.module.scss';
import dogImg from '../../../../public/images/welsh.webp';
import toy from '../../../../public/images/toy.webp';
import family from '../../../../public/images/family.webp';
import mungstagram from '../../../../public/images/mungstagram.webp';
import walk from '../../../../public/images/walk.webp';
import hotel from '../../../../public/images/hotel.webp';
import restaurant from '../../../../public/images/restaurant.webp';
import travel from '../../../../public/images/travel.webp';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MainGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <motion.div
          className={styles.firstSection}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            x: { duration: 1 }
          }}
        >
          <div className={styles.firstTextWrap}>
            <p>
              <span className={styles.bold}>우리 동네</span>에서
            </p>
            <p>
              다양한 <span className={styles.bold}>반려견 정보</span>를
            </p>
            <p>공유하고 거래하는</p>
          </div>
          <div className={styles.firstImageWrap}>
            <Image
              src={dogImg}
              alt="image"
              width={600}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        </motion.div>
      </div>
      <div className={styles.secondSection}>
        <motion.div
          className={styles.secondTextWrap}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            x: { duration: 1 }
          }}
        >
          <div className={styles.secondBold}>
            저희 <span>퍼피그라운드는요</span>
          </div>
          <p>
            우리 아이들이 <span>사용하지 않는 제품을</span>
          </p>
          <p>
            가까운 이웃과 <span>손쉽게 거래할 수 있습니다</span>
          </p>
          <Link href="/used-goods">
            <motion.button
              className={styles.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              거래하러 가기
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className={styles.secondImageWrap}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1
          }}
        >
          <Image src={toy} alt="image" width={500} height={500} className={styles.image} />
        </motion.div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.thirdImageWrap}>
          <Image src={family} alt="image" width={1000} height={500} className={styles.image} />
        </div>
        <div className={styles.thirdTextWrap}>
          <motion.p
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              y: { duration: 1 }
            }}
          >
            사지말고 입양하세요
          </motion.p>
          <Link href="/stray-dogs">
            <motion.button
              className={styles.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              입양하러 가기
            </motion.button>
          </Link>
        </div>
      </div>
      <div className={styles.fourthSection}>
        <motion.div
          className={styles.fourthImageWrap}
          whileInView={{ opacity: [0, 1], scale: [0.6, 1.1, 1] }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1
          }}
        >
          <Image src={mungstagram} alt="image" width={600} height={400} className={styles.image} />
        </motion.div>
        <motion.div
          className={styles.fourthTextWrap}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            x: { duration: 1 }
          }}
        >
          <p>사랑스러운,</p>
          <div className={styles.fourthBold}>
            우리 아이들을 <span>자랑해봐요!</span>
          </div>
          <Link href="/mungstagram">
            <motion.button
              className={styles.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              자랑하러 가기
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <div className={styles.fifthContainer}>
        <motion.div
          className={styles.fifthSection}
          whileInView={{ opacity: [0, 1], scale: [0.6, 1.1, 1] }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1
          }}
        >
          <div className={styles.fifthTextWrap}>
            <p>
              아이들과 <span className={styles.bold}>함께 여행을</span> 떠나볼까요?
            </p>
            <Link href="/facilities">
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                동반여행 가기
              </motion.button>
            </Link>
          </div>
          <div>
            <div className={styles.fifthImageGrid}>
              <Image src={walk} alt="image" width={250} height={300} className={styles.image} />
              <Image src={hotel} alt="image" width={250} height={300} className={styles.image} />
              <Image
                src={restaurant}
                alt="image"
                width={250}
                height={300}
                className={styles.image}
              />
              <Image src={travel} alt="image" width={250} height={300} className={styles.image} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainGrid;

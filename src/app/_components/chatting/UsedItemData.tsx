import { Tables } from '@/shared/supabase/types/supabase';
import styles from './usedItemData.module.scss';
import Image from 'next/image';
import { addCommasToNumber } from '@/utils/format';

const UsedItemData = ({
  usedItem,
  clickUsedItem
}: {
  usedItem?: Tables<'used_item'>;
  clickUsedItem: (usedItemId: number) => void;
}) => {
  return (
    <div className={styles.usedItemContainer}>
      <div className={styles.usedItemImage}>
        <Image width={50} height={50} src={`${usedItem?.photo_url[0]}`} alt="물건 사진" />
      </div>
      <div className={styles.usedItem} onClick={() => clickUsedItem(usedItem?.id as number)}>
        <div className={styles.usedItemTitle}>
          <p className={styles.title}>{usedItem?.title}</p>
          <p className={usedItem?.sold_out ? styles.soldOut : styles.sell}>
            {usedItem?.sold_out ? '판매완료' : '판매중'}
          </p>
        </div>
        <div className={styles.usedItemPrice}>
          <p>{usedItem?.price && addCommasToNumber(usedItem?.price as number)}원</p>
        </div>
      </div>
    </div>
  );
};

export default UsedItemData;

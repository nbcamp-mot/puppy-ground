import { TablesInsert } from '@/shared/supabase/types/supabase';
import { supabase } from '@/shared/supabase/supabase';

export const addUsedGoodWish = async (
  addUsedGoodWish: TablesInsert<'used_item_wish'>
): Promise<void> => {
  await supabase.from('used_item_wish').insert(addUsedGoodWish).select();
};

export const removeUsedGoodWish = async (
  removeUsedGoodWish: TablesInsert<'used_item_wish'>
): Promise<void> => {
  await supabase
    .from('used_item_wish')
    .delete()
    .eq('user_id', removeUsedGoodWish.user_id)
    .eq('target_id', removeUsedGoodWish.target_id);
};

export const getUsedGoodWish = async (user_id: string) => {
  const { data } = await supabase
    .from('used_item_wish')
    .select(
      `*, used_item ( id, title, price, photo_url, sold_out, address, created_at, used_item_wish ( count ), chat_list ( count ))`
    )
    .eq('user_id', user_id);

  return data;
};

export const addMungStagramLike = async (
  addMungStagramLike: TablesInsert<'mung_stagram_like'>
): Promise<void> => {
  await supabase.from('mung_stagram_like').insert(addMungStagramLike).select();
};

export const removeMungStagramLike = async (
  removeMungStagramLike: TablesInsert<'mung_stagram_like'>
): Promise<void> => {
  await supabase
    .from('mung_stagram_like')
    .delete()
    .eq('user_id', removeMungStagramLike.user_id)
    .eq('target_id', removeMungStagramLike.target_id);
};

export const getMungStagramLike = async (user_id: string) => {
  const { data } = await supabase
    .from('mung_stagram_like')
    .select(
      `*, mung_stagram ( id, photo_url, title, content, tags, profiles ( user_name, avatar_url ))`
    )
    .eq('user_id', user_id);

  return data;
};

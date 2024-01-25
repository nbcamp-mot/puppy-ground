import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

export type AlertType = {
  type: string;
  targetId: number;
  message: string;
  userId: string;
};

export const ALERT_MESSAGE_LENGTH = 5;

// alert_message 테이블에서 데이터 가져오기
export const findAllMessageByUserId = async () =>
  //   userId
  //   pageParam = 0
  // }: {
  //   userId: string;
  //   pageParam: number;
  {
    const findAllMessageQuery = await supabase
      .from('alert_message')
      .select('*')
      .order('create_at', { ascending: false })
      // TODO: 이 부분에 대한 설명 적기
      // .range(
      //   pageParam === 0 ? pageParam : pageParam + 1,
      //   pageParam === 0 ? 2 : pageParam + ALERT_MESSAGE_LENGTH
      // )
      // .eq('user_id', userId)
      .returns<Tables<'alert_message'>[]>();

    const { data, error } = findAllMessageQuery;
    return { data, error };
  };

// alert_message 테이블에 데이터 넣기
export const addAlertMessageByIdAndTarget = async ({
  type,
  targetId,
  message,
  userId
}: AlertType) => {
  await supabase
    .from('alert_message')
    .insert({ type, message, target_id: targetId, user_id: userId })
    .select();
};

// 알림 메시지 클릭 시 읽음상태로 만들기
export const updateAlertMessageStatus = async (id: string) => {
  return await supabase.from('alert_message').update({ status: true }).eq('id', id);
};
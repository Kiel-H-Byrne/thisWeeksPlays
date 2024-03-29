import useSWR from 'swr';
import fetcher from '@/lib/fetch';

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

export function fetchUser(userId) {
  const { data } = useSWR(`/api/users/${userId}`, fetcher, { revalidateOnFocus: false });
  return data?.user;
}

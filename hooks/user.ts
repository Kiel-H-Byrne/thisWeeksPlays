import useSWR from 'swr';
import fetcher from '@/lib/fetch';

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

export function useUser(userId) {
  const { data, error } = useSWR(`/api/users/${userId}`, fetcher, { revalidateOnFocus: false });
  console.log(data, error)
  return data?.user;
}

import React from 'react';
import { useSWRInfinite } from 'swr';
// import { useUser } from '@/hooks/index';
import fetcher from '@/lib/fetch';
// import { InteractiveUserName } from '../InteractiveUserName';

function Order({ order }) {
  // const user = useUser(order.creatorId);
  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0,0,0,0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
          small {
            color: #777;
          }
        `}
      </style>
      <div>
        {/* {user && (
          <InteractiveUserName userName={user.userName} uid={user._id} />
          <Link href={`/user/${user._id}`}>
            <a style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img width="27" height="27" style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.3rem' }} src={user.profilePicture || defaultProfilePicture(user._id)} alt={user.name} />
              <b>{user.name}</b>
            </a>
          </Link>
        )} */}
        <p>
          {order.content}
        </p>
        <small>{new Date(order.submitDate).toLocaleString()}</small>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export function useOrderPages({ creatorId }) {
  return useSWRInfinite((index, previousPageData) => {
    // reached the end
    if (previousPageData && previousPageData.orders.length === 0) return null;

    // first page, previousPageData is null
    if (index === 0) {
      return `/api/orders?limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ''
      }`;
    }

    // using oldest orders submitDate date as cursor
    // We want to fetch orders which has a datethat is
    // before (hence the .getTime() - 1) the last order's submitDate
    const from = new Date(
      new Date(
        previousPageData.orders[previousPageData.orders.length - 1].submitDate,
      ).getTime() - 1,
    ).toJSON();

    return `/api/orders?from=${from}&limit=${PAGE_SIZE}${
      creatorId ? `&by=${creatorId}` : ''
    }`;
  }, fetcher, {
    // refreshInterval: 10000, // Refresh every 10 seconds
  });
}

export default function Orders({ creatorId }) {
  const {
    data, error, size, setSize,
  } = useOrderPages({ creatorId });

  const orders = data ? data.reduce((acc, val) => [...acc, ...val.orders], []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0].orders?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.orders.length < PAGE_SIZE);

  return (
    <div>
      {orders.map((order) => <Order key={order._id} order={order} />)}
      {!isReachingEnd && (
      <button
        type="button"
        onClick={() => setSize(size + 1)}
        disabled={isReachingEnd || isLoadingMore}
      >
        {isLoadingMore ? '. . .' : 'load more'}
      </button>
      )}
    </div>
  );
}

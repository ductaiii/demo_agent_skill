// UserProfile.jsx (CODE CHẬM - CẦN TỐI ƯU)
import React, { useEffect, useState } from 'react';

export default function UserProfile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      // ❌ SAI LẦM: Gọi tuần tự (Waterfall)
      // Cái trên xong mới chạy cái dưới -> Rất lãng phí thời gian
      const user = await fetch(`/api/users/${userId}`).then(r => r.json());
      const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());
      const friends = await fetch(`/api/users/${userId}/friends`).then(r => r.json());

      setData({ user, posts, friends });
      setLoading(false);
    }

    loadData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>{data.user.name}</h1>
      <p>Posts: {data.posts.length}</p>
      <p>Friends: {data.friends.length}</p>
    </div>
  );
}
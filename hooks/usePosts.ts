'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Post } from 'services/types/post';

interface UsePostsOptions {
  status?: 'pending' | 'approved' | 'rejected';
}

export function usePosts({ status = 'approved' }: UsePostsOptions) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];

        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [status]);

  return { posts, loading };
}

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { Post } from 'services/types/post';

/**
 * Creates a new post (status: pending)
 */
export async function createPost(post: {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
}) {
  const ref = collection(db, 'posts');
  return await addDoc(ref, {
    ...post,
    status: 'pending',
    createdAt: Timestamp.now(),
  });
}

/**
 * Fetches all posts with a given status (admin or public feed)
 */
export async function getPostsByStatus(status: 'approved' | 'pending' | 'rejected'): Promise<Post[]> {
  const q = query(
    collection(db, 'posts'),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
}

/**
 * Approve a post (admin action)
 */
export async function approvePost(postId: string) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    status: 'approved',
    approvedAt: Timestamp.now(),
  });
}

/**
 * Reject a post (admin action)
 */
export async function rejectPost(postId: string, adminNote?: string) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    status: 'rejected',
    adminNote: adminNote || '',
  });
}

/**
 * Delete a post (admin or user action)
 */
export async function deletePost(postId: string) {
  const postRef = doc(db, 'posts', postId);
  await deleteDoc(postRef);
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(postId: string): Promise<Post | null> {
  const postRef = doc(db, 'posts', postId);
  const snapshot = await getDoc(postRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Post;
}

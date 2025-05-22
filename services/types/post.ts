import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  approvedAt?: Timestamp;
  updatedAt?: Timestamp;
  adminNote?: string;
}

import { Status } from './status';
export interface Book {
  id: number;
  title: string;
  author: string;
  status: Status
  ISBN: string;
  rating: number;
  image?: string;
  description?: string;
}

import { User } from './user';
import { Status } from './status';
export interface Book {
  id: number;
  title: string;
  author: string;
  status: Status
  isbn: string;
  rating: number;
  image?: string;
  description?: string;
  addedBy:number;
}

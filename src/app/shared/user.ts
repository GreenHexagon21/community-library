import { AccessLevel } from './access-level';
import { Book } from "./book";

export interface User {
  id: number;
  username: string;
  password: string;
  contact: string;
  books: Book[];
  rating: number;
  permissions: AccessLevel
  dateOfRegistration: Date;
}

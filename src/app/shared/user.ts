import { AccessLevel } from './access-level';
import { Book } from "./book";

export class User {
  constructor(
    public username: string,
    public id: number,
    private _token: string,
    private _tokenExpirationDate: Date,
    contact?: string,
    public books?: Book[],
    rating?: number,
    permissions?: AccessLevel,
    dateOfRegistration?: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return false;
    }
    return this._token;
  }
}

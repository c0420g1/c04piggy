import { Role } from './Role';

export class AccountRole{
    id: number;
   description: string;
    isDeleted: number;
   account: Account;
   role: Role;
}

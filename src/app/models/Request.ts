import {User} from './User';

export interface Request {
  id?: number;
  content: string;
  room?: number;
  comment: string;
  status: string;
  user?: User;
}

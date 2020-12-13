import * as jwt from 'jsonwebtoken';
import {Types} from 'mongoose';
import Admin from '../models/admin.model';

export const getAdminByToken = (token: String) => {
  if (!token) {
    return {};
  }

  const id = jwt.verify(token.toString(), process.env.SECRET_KEY);

  return Admin.findById(Types.ObjectId(id.toString())).exec();
};

export interface Context {
  admin: Object
}

export const authenticated = (next: Function) => (root: Object, args: Object, context: Context, info: any) => {
  if (!context.admin) {
    throw new Error('Unauthenticated!');
  }

  return next(root, args, context, info);
};

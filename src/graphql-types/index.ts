import mongoose, {Types} from 'mongoose';
import Admin from '../models/admin.model';

export const typeDefs = `
  type Admin {
    id: ID!
    email: String
    isEnabled: Boolean
  }

  type Query { admin(id: String): Admin }
`;

interface Params {
  id: string,
}

const adminResolver = (_: any, {id}: Params) => {
  return Admin.findById(Types.ObjectId(id)).exec();
};

export const resolvers = {
  Query: { admin: adminResolver },
};

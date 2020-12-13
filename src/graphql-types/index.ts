import * as jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import Assembler from '../models/assembler.model';
import {authenticated, Context} from "../db/middlewares";

export const typeDefs = `
  type Admin {
    email: String
    isEnabled: Boolean
    token: String
  }
  
  input AssemblerCreate {
    email: String!
    phone: String!
    password: String!
    isEnabled: Boolean!
  }
  
  type Assembler {
    email: String
    phone: String
    isEnabled: Boolean
  }


  type Query { 
    adminLogin(email: String, password: String): Admin
    me: Admin,
    assemblers: [Assembler] 
  }
  
  type Mutation {
    createAssembler(params: AssemblerCreate): Assembler!
  }
`;

interface AdminLoginParams {
  email: string,
  password: string,
}

const adminLoginResolver = async (_: any, {email, password}: AdminLoginParams) => {
  const admin = await Admin.findOne({email, password}).exec();

  if (!admin) {
    return {};
  }

  // TODO: change and secure private key
  const token = jwt.sign(admin._id.toString(), process.env.SECRET_KEY);

  return {
    email: admin.email,
    isEnabled: admin.isEnabled,
    token
  }
};

interface AssemblerCreateParams {
  params: {
    email: String,
    password: String,
    phone: String,
    isEnabled: String,
  }
}

const createAssemblerResolver = async (_: any, {params}: AssemblerCreateParams) => {
  const assembler = new Assembler({
    email: params.email,
    password: params.password,
    phone: params.phone,
    isEnabled: params.isEnabled,
  });

  return assembler.save();
};

const assemblersResolver = (_: any, __: any) => {
  return Assembler.find();
};

export const resolvers = {
  Query: {
    adminLogin: adminLoginResolver,
    me: authenticated((root: Object, args: Object, context: Context) => context.admin),
    assemblers: authenticated((root: Object, args: Object, context: Context) => !!context.admin ? assemblersResolver(root, args) : [{}]),
  },
  Mutation: {
    createAssembler: authenticated((root: Object, args: AssemblerCreateParams, context: Context) => !!context.admin ? createAssemblerResolver(root, args) : {}),
  }
};

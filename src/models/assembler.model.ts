import mongoose, { Schema, Document } from 'mongoose';

export interface IAssembler extends Document {
  email: string;
  phone: string;
  password: string;
  isEnabled: boolean;
  createDatetime: Date,
  modifyDatetime: Date,
}

const AssemblerSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isEnabled: { type: Boolean, required: true, default: true },
  createDatetime: { type: Date, required: true, default: new Date()},
  modifyDatetime: { type: Date, required: true, default: new Date()}
});

export default mongoose.model<IAssembler>('Assembler', AssemblerSchema);

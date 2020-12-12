import mongoose, { Schema, Document } from 'mongoose';

export enum OrderType {
  // ...
  furniture,
  kitchen,
  other,
}

export enum OrderDifficulty {
  // ...
  ez,
  medium,
  hard
}

export interface IOrder extends Document {
  orderId: string;
  orderType: OrderType,
  orderDifficulty: OrderDifficulty,
  price: number;
}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  orderType: { type: Number, enum: Object.values(OrderType), },
  orderDifficulty: { type: Number, enum: Object.values(OrderDifficulty), },
  price: { type: Number, require: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);

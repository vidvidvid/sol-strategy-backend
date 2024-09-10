import mongoose, { Document, Schema } from "mongoose";

export interface ITrade extends Document {
  userId: Schema.Types.ObjectId;
  type: string;
  pair: string;
  amount: number;
  price: number;
  timestamp: Date;
  status: string;
}

const TradeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  pair: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true },
});

export default mongoose.model<ITrade>("Trade", TradeSchema);

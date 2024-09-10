import mongoose, { Document, Schema } from "mongoose";

export interface IStrategy extends Document {
  userId: Schema.Types.ObjectId;
  type: string;
  parameters: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const StrategySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  parameters: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStrategy>("Strategy", StrategySchema);

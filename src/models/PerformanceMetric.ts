import mongoose, { Document, Schema } from "mongoose";

export interface IPerformanceMetric extends Document {
  userId: Schema.Types.ObjectId;
  totalProfit: number;
  winRate: number;
  tradeCount: number;
  lastUpdated: Date;
}

const PerformanceMetricSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalProfit: { type: Number, default: 0 },
  winRate: { type: Number, default: 0 },
  tradeCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IPerformanceMetric>(
  "PerformanceMetric",
  PerformanceMetricSchema
);

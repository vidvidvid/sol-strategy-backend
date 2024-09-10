import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  publicKey: string;
  email?: string;
  characterType: string;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  publicKey: { type: String, required: true, unique: true },
  email: { type: String },
  characterType: { type: String, required: true },
  preferences: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);

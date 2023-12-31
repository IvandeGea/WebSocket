
import mongoose, { Document, Schema } from 'mongoose';

export interface Message {
  text: string;
  createdAt: Date;
}

 export interface UserDocument extends Document {
  googleId: string;
  displayName: string;
  messages: Message[];
  email: string;
}

const userSchema = new Schema<UserDocument>({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  messages: [{ text: String, createdAt: { type: Date, default: Date.now } }],
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;


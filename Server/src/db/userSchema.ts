// const mongoose = require('mongoose');
// const messageSchema = require('./messageSchema');



// const userSchema = new mongoose.Schema({
//   googleId: { type: String, required: true },
//   displayName: { type: String, required: true },
//   messages: []
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


import mongoose, { Document, Schema } from 'mongoose';

export interface Message {
  text: string;
  createdAt: Date;
}

 export interface UserDocument extends Document {
  googleId: string;
  displayName: string;
  messages: Message[];
}

const userSchema = new Schema<UserDocument>({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  messages: [{ text: String, createdAt: { type: Date, default: Date.now } }],
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;


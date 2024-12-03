import { MessageRole } from '@ai-chat/ai';
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId | null;
  text: string;
  role: MessageRole;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    role: { type: String, enum: Object.values(MessageRole), required: true },
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true }
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);

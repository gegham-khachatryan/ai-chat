export interface User {
  _id: string;
  username: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  sender: User | null;
  text: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  title: string;
  aiProvider: any;
  participants: User[];
}

export interface ListResponse<T> {
  data: T[];
  cursor: { total: number; skip: number; limit: number };
}
export interface ListRequestParams {
  page: number;
  limit: number;
}

export interface ErrorResponse {
  [key: string]: any;
  message: string;
}

export interface Post {
  url: string;
  quantity: number;
  unique: Boolean;
  comment: Comment;
  timeWait: TimeWait;
  user: User;
}

export interface TimeWait {
  min: number;
  max: number;
}

export interface User {
  username: string;
  password: string;
}

export interface Comment {
  customizableComments: string[];
  users: string[];
  hashtag: string;
}
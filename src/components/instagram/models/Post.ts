export interface Post {
  url: string;
  customizableComments: string[];
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


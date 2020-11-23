import { InstagramCommon } from './InstagramCommon';

export interface FollowUser extends InstagramCommon {
  timeWait: TimeWait;
  sleepTime?: number;
}

export interface TimeWait {
  min: number;
  max: number;
}

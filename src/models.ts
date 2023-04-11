export type Anime = {
  name_english?: string;
  image?: string;
  score?: Score;
  link?: string;
};

export type AnimeModel = {
  id: string;
  name_japanese?: string;
  types?: string[];
  status?: Status;
  comments?: string;
  isPublic?: boolean;
} & Anime;

export enum Score {
  Appalling = 'Appalling',
  Horrible = 'Horrible',
  VeryBad = 'Very Bad',
  Bad = 'Bad',
  Average = 'Average',
  Fine = 'Fine',
  Good = 'Good',
  VeryGood = 'Very Good',
  Great = 'Great',
  Masterpiece = 'Masterpiece',
};

export enum Status {
  Completed = 'Completed',
  Watching = 'Watching',
  OnHold = 'On Hold',
  Dropped = 'Dropped',
  PlanToWatch = 'Plan to Watch'
};

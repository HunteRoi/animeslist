
export type Anime = {
  name_japanese?: string;
  image?: string;
  score?: Score;
};

export type AnimeModel = {
  id: string;
  image: string;
  name_english?: string;
  name_japanese?: string;
  type?: string;
  score?: Score;
  status?: Status;
  comments?: string;
};

export enum Score {
  Appalling = "Appalling",
  Horrible = "Horrible",
  VeryBad = "Very Bad",
  Bad = "Bad",
  Average = "Average",
  Fine = "Fine",
  Good = "Good",
  VeryGood = "Very Good",
  Great = "Great",
  Masterpiece = "Masterpiece",
};

export enum Status {
  Completed = "Completed",
  Watching = "Watching",
  OnHold = "On Hold",
  Dropped = "Dropped",
  PlanToWatch = "Plan to Watch"
};

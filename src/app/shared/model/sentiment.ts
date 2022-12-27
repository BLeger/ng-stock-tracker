export interface ISentiment {
  symbol: string;
  name: string;
  data: ISentimentData[];
}

export interface ISentimentData {
  month: number;
  year: number;
  change: number;
  mspr: number;
}

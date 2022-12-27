export interface IFinnHubSentiment {
  symbol: string;
  data: IFinnHubSentimentData[];
}

export interface IFinnHubSentimentData {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

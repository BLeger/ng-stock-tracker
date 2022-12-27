export interface IFinnHubSearch {
  count: number;
  result: IFinnHubSearchResult[];
}

export interface IFinnHubSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

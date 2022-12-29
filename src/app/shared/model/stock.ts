export interface IStockName {
  name: string;
  symbol: string;
}
export interface IStock {
  symbol: string;
  name: string;
  price: number;
  changeToday: number;
  opening: number;
  high: number;
}

import { StockPrice } from "./StockPrice";

export interface StockPriceDetail {
    minStockPrice: number;
    maxStockPrice: number;
    avgStockPrice: number;
    stockPriceList: StockPrice[];    
  }
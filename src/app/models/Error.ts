import { StockPriceDetailResponse } from "./StockPriceDetailResponse";

export interface Error {
    // error?: string;
    error: StockPriceDetailResponse;
    status?: string;
    
  }
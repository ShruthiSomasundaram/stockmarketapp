import { StockPriceDetail } from "./StockPriceDetail";

export interface StockPriceDetailResponse {
    statusMessage: string;
    errorMessage: string;
    stockPriceDetail: StockPriceDetail;
    
  }
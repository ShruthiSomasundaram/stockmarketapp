import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { StockPrice } from './models/StockPrice';
import { Error } from './models/Error';
import { error } from '@angular/compiler/src/util';
import { Company } from './models/Company';
import { StockPriceDetailResponse } from './models/StockPriceDetailResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stocktitle = 'stockmarketapp';

  stockPrice: StockPrice[];

  companyCode: string ='';

  companyName: string;
  sDate: string;
  eDate: string;

  visible: boolean ;
  errorObj: Error;

  isCollapsed:boolean;

  stockPriceErrorMessage: string;

  minStockValue : number;
  maxStockValue : number;
  avgStockValue : number;

  companies : Company[];

  error: any = {isError:false,errorMessage:''};
  constructor(private apiService : ApiService) {}

  public getStockDetails() {

       this.apiService.getStockDetails(this.companyName,this.sDate,this.eDate).subscribe((response) => {
      if(response!=null && response.stockPriceDetail.stockPriceList.length>0) {
          this.populateStockPriceResponse(response);
        } else {
          this.stockPrice=[];
          this.visible=false;
      }
      this.isCollapsed=true;
     }, (error) => {                              
      console.error('error caught in component')
      this.stockPrice=[];
      this.visible= true;
      this.errorObj = error;
      this.stockPriceErrorMessage = this.errorObj.error?.errorMessage;
      this.error = {isError : true,errorMessage : this.stockPriceErrorMessage};
      this.isCollapsed=false;
    });

  }

  private populateStockPriceResponse(response: StockPriceDetailResponse) {
    this.stockPrice = response.stockPriceDetail.stockPriceList;
    this.minStockValue = response.stockPriceDetail.minStockPrice;
    this.maxStockValue = response.stockPriceDetail.maxStockPrice;
    this.avgStockValue = response.stockPriceDetail.avgStockPrice;
    this.visible = true;
  }

  public getCompanies() {
    this.apiService.getCompanies().subscribe((response) => {
      if(response!=null && response.companyDetails.length>0) {
        this.companies= response.companyDetails;
      }
  });

}

  

  public clear() {
    this.companyCode='';
    this.stockPriceErrorMessage ='';
    this.stockPrice = [];
  }

  ngOnInit() {
    this.clear();
    this.getCompanies();
  }

  onClick() {
    this.getStockDetails();
    this.clear();
  }

 

   

  
}




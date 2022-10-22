import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StockPrice } from '../models/StockPrice';
import { Company } from '../models/Company';
import { environment } from '../../environments/environment';


import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { StockPriceDetailResponse } from '../models/StockPriceDetailResponse';
import { CompanyDetails } from '../models/CompanyDetail';

const BACKEND_URL = 'https://gateway-applicaton.azurewebsites.net/gateway/stock/api/v1.0/market/stock/get/';

const COMPANY_URL =  'https://gateway-applicaton.azurewebsites.net/gateway/company/api/v1.0/market/company/getall';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor (private http:HttpClient) {}

    getStockDetails(companyCode: string,startDate: string,endDate: string) : Observable<StockPriceDetailResponse>{
    return this.http.get<StockPriceDetailResponse>(BACKEND_URL+companyCode+'/'+startDate+'/'+endDate).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);    
      })
    )
  }

    getCompanies() : Observable<CompanyDetails> {

    return this.http.get<CompanyDetails>(COMPANY_URL);
  }
  
}

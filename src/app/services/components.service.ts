import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment'
import { wordModel } from '../models/Words.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(
    private http: HttpClient
  ) {}

  getWords(): Observable<wordModel[]>{
    const url = env.URL_DB + "Words"
    return this.http.get<wordModel[]>(url)
  }
}

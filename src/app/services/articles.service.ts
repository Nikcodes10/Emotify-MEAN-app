import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { Article } from '../shared/article';
import { Observable } from 'rxjs';
import { URL } from '../shared/url';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcesshttpmsgService) { }

    getArticles(): Observable<Article[]> {
      return this.http.get<Article[]>(URL + 'api/articles')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getCategorizedArticles(cat: string): Observable<Article[]> {
      return this.http.get<Article[]>(URL +'api/articles?category='+ cat)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    postArticle(article: Article): Observable<Article> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      };
    return this.http.post<Article>(URL + 'api/articles',
    article,
    httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    getId(category :string): Observable<number> {
      return this.http.get<number>(URL+'api/articles/'+category).pipe(catchError(this.processHTTPMsgService.handleError));
    }
}


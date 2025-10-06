import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface Article {
  id: string;
  title: string;
  desc: string;
  author?: string;
  imgPath?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private baseUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ code: string; message: string; data: Article[] }>(this.baseUrl).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  getById(id: string) {
    return this.http.get<{ code: string; message: string; data: Article }>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  save(article: Article) {
    return this.http.post<{ code: string; message: string; data: Article }>(`${this.baseUrl}/save`, article).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  delete(id: string) {
    return this.http.delete<{ code: string; message: string; data: any }>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => throwError(() => err))
    );
  }
}

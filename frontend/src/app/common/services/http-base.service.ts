import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class BaseService {
  private baseUrl = 'http://localhost:3000/';
  protected modulePath = '';
  private http = inject(HttpClient);
  private snackBar = inject(SnackBarService);

  private getUrl(path: string) {
    if (this.modulePath) {
      return this.baseUrl + this.modulePath + '/' + path;
    }

    return this.baseUrl + path;
  }

  private async handleHttpObservable<R>(req: Observable<R>) {
    try {
      const res = await firstValueFrom(req);
      return res;
    } catch (err) {
      const error = err as HttpErrorResponse;
      this.snackBar.open(error.error.message);
      return null;
    }
  }

  get<R>(path: string) {
    return this.handleHttpObservable(
      this.http.get<R>(this.getUrl(path), {
        withCredentials: true,
      })
    );
  }

  post<R>(path: string, data: any) {
    return this.handleHttpObservable(
      this.http.post<R>(this.getUrl(path), data, {
        withCredentials: true,
      })
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

interface Config {
  throwError?: boolean;
  showError?: boolean;
}

@Injectable()
export class BaseService {
  static baseUrl = 'http://localhost:3000/';
  protected modulePath = '';
  private http = inject(HttpClient);
  private snackBar = inject(SnackBarService);

  private getUrl(path: string) {
    if (this.modulePath) {
      return BaseService.baseUrl + this.modulePath + '/' + path;
    }

    return BaseService.baseUrl + path;
  }

  private async handleHttpObservable<R>(req: Observable<R>, config?: Config) {
    const throwError = config?.throwError ?? false;
    const showError = config?.showError ?? true;

    try {
      const res = await firstValueFrom(req);
      return res;
    } catch (err) {
      const error = err as HttpErrorResponse;

      if (showError) {
        this.snackBar.open(error.error.message);
      }

      if (throwError) {
        throw error;
      }

      return null;
    }
  }

  get<R>(path: string, config?: Config) {
    return this.handleHttpObservable(
      this.http.get<R>(this.getUrl(path), {
        withCredentials: true,
      }),
      config
    );
  }

  post<R>(path: string, data: any, config?: Config) {
    return this.handleHttpObservable(
      this.http.post<R>(this.getUrl(path), data, {
        withCredentials: true,
      }),
      config
    );
  }

  patch<R>(path: string, data: any, config?: Config) {
    return this.handleHttpObservable(
      this.http.patch<R>(this.getUrl(path), data, {
        withCredentials: true,
      }),
      config
    );
  }

  delete<R>(path: string, config?: Config) {
    return this.handleHttpObservable(
      this.http.delete<R>(this.getUrl(path), {
        withCredentials: true,
      }),
      config
    );
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string) {
    this.snackBar.open(message, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}

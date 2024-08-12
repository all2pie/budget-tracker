import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../common/components/header/header.component';
import { UserService } from '../../auth/user.service';
import { User } from '../../common/types/user.interface';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPaginatorModule,
    CommonModule,
  ],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];

  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: UserService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    const res = await this.service.getAllUsers();

    if (res) {
      this.dataSource.data = res;
    }
  }

  openDialogue(id: string, mode: 'update' | 'delete') {
    this.dialog
      .open(UserDialogComponent, {
        data: { id, mode },
      })
      .afterClosed()
      .subscribe((isDone) => {
        if (isDone) {
          this.ngOnInit();
        }
      });
  }
}

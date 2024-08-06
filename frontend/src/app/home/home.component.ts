import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { isAdmin } from '../common/state/user.state';
import { UserService } from '../auth/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class HomeComponent {
  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isMobile: boolean;
  isNavOpen = true;

  navItems: {
    icon: string;
    name: string;
    link?: string;
    action?: () => void;
  }[] = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.isMobile = this.mobileQuery.matches;

    this.navItems = [
      {
        name: 'Analysis',
        icon: 'monitoring',
        link: 'analysis',
      },
      {
        name: 'Expenses',
        icon: 'send_money',
        link: 'expenses',
      },
      ...(isAdmin()
        ? [
            {
              name: 'Users',
              icon: 'group',
              link: 'users',
            },
          ]
        : []),
      {
        name: 'Logout',
        icon: 'logout',
        action: this.userService.handleLogout.bind(this.userService),
      },
    ];
  }

  toggleSideNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}

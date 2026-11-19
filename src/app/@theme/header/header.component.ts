import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbUserModule,
} from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LayoutService } from '@theme/layout/layout.service';

@Component({
  selector: 'ngx-layout-header',
  imports: [
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly menuService = inject(NbMenuService);
  private readonly breakpointService = inject(NbMediaBreakpointsService);
  private readonly themeService = inject(NbThemeService);
  private readonly sidebarService = inject(NbSidebarService);
  private readonly layoutService = inject(LayoutService);
  private readonly cookieService = inject(CookieService);

  public isActive = true;
  public userPictureOnly = false;
  public header = {
    title: '值得墉有',
  };
  public user = {
    lastName: '',
    fullName: '',
    picture: '',
  };
  public userMenu = [{ title: '個人資料' }, { title: '登出' }];
  public notifyRecords: any[] = [];

  public currentTheme = 'default';
  public themes = [
    { name: 'Light', value: 'default' },
    { name: 'Dark', value: 'dark' },
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' },
  ];

  public ngOnInit(): void {
    this.user.fullName = this.cookieService.get('username');

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((isLessThanXl) => (this.userPictureOnly = isLessThanXl));

    this.currentTheme = this.themeService.currentTheme;
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map(({ item: { title } }) => title),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((title) => {
        if (title === '登出') {
          this.cookieService.deleteAll('/');
          this.router.navigate(['/login']);
        }
      });
  }

  public changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.isActive = !this.isActive;
    return false;
  }

  public navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }
}
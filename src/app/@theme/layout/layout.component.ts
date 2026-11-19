import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '@common/services/loading.service';
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbSpinnerModule } from '@nebular/theme';
import { HeaderComponent } from '@theme/header/header.component';

@Component({
  selector: 'ngx-column-layout',
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbSpinnerModule,
    HeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public loading: boolean = false;

  constructor(private loadingService: LoadingService) { }

  public ngOnInit(): void {
    this.loadingService.getLoading().subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}

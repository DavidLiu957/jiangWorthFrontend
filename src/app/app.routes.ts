import { Routes } from '@angular/router';
import { LayoutComponent } from '@theme/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // 你的子頁面路由放這裡
        ],
    },
];
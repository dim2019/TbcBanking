import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { MainComponent } from "./main/main.component";
import { LayoutService } from "./services/layout.service";
import { FooterComponent } from "./footer/footer.component";
import { NewsComponent } from "../features/news/news.component";
import { NotificationsComponent } from "./topbar/notifications/notifications.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "transactions",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/transactions/transactions.module").then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: "payments",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/payments/payments.module").then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: "accounts",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/accounts/accounts.module").then((m) => m.AccountsModule),
      },
      {
        path: "currency",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/currencies/currency.module").then(
            (res) => res.CurrencyModule
          ),
      },
      {
        path: "reports",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/reports/reports.module").then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: "settings",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../features/settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },
      {
				path: 'invoices',
        canActivate: [AuthGuard],
				loadChildren: () =>
					import('../features/invoice/invoice.module').then(m => m.InvoicesModule),
			},
      {
        path: "news",
        component: NewsComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];

const components = [SidebarComponent, TopbarComponent, MainComponent, NewsComponent];
const modules = [CommonModule, SharedModule, InfiniteScrollModule, RouterModule.forChild(routes)];
@NgModule({
	declarations: [...components, FooterComponent, NotificationsComponent],
	imports: [...modules],
	exports: [RouterModule, ...components],
	providers: [LayoutService],
})
export class LayoutModule { }

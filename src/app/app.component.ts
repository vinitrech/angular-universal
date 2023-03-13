import {Component, OnInit, Inject, PLATFORM_ID, InjectionToken} from '@angular/core';
import {LoggingService} from "./logging.service";
import {Store} from "@ngrx/store";
import * as fromApp from "./store/app.reducer"
import * as AuthActions from "./auth/store/auth.actions"
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // ng universal enables node based engine rendering (can be used as ssr or at build time), so the project should be executed in a node server
    // the ssr works so that the page visited is rendered very fast (HTML + CSS initial render) and with full content for web crawlers to index
    // once the app loads, the user will get the full interaction of a normal spa app

    constructor(private store: Store<fromApp.AppState>,
                private loggingService: LoggingService,
                @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>) { // inject platform id to check if it is a server
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) { // angular helper to check platform id
            this.store.dispatch(new AuthActions.AutoLogin());
        }

        this.loggingService.printLog('Hello from AppComponent ngOnInit');
    }
}

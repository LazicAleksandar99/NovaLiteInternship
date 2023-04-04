import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base'
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLicense(environment.dateKey)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

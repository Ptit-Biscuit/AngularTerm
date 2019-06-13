import {filter, first} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {DownloadComponent} from '../download/download.component';

export class ModuleComponent {
  public installed = false;

  constructor(public name: string, public path: string, public downloads: DownloadComponent[], public help: string) {
  }

  /** Install process for module */
  public install(): Observable<boolean> {
    if (!this.installed) {
      this.downloads.forEach(dl => {
          dl.complete().pipe(filter(complete => complete), first()).subscribe(() => {
            console.log('complete');
          });
        }
      );
    }

    return of(true);
  }
}

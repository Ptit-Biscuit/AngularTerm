import {Observable, of, timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';

export class DownloadComponent {
  private speed = 0;
  private percent = 0;

  constructor(public name: string, public version: string) {
    this.speed += 100 * (1 + Math.random());
  }

  /** Completeness of download */
  public complete(): Observable<boolean> {
    return of(this.percent === 100);
  }

  /** Update progress bar */
  public update(): Observable<string> {
    return timer(this.speed).pipe(
      takeWhile(() => this.percent <= 100),
      map(() => {
        const done = new Array(Math.floor(this.percent / 5) + 1).join('#');
        const remaining = new Array(Math.ceil((100 - this.percent) / 5) + 1).join('-');

        return `${this.speed.toFixed(1)} TiB/ms [${done}${remaining}] ${this.percent++}%`;
      })
    );
  }
}

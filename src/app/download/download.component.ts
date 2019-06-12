import {Component} from '@angular/core';
import {Observable, of, timer} from "rxjs";
import {map, takeWhile} from "rxjs/operators";
import {LoadedComponent} from "../component-loader/loaded-component";
import {DownloadData} from "./download-data.interface";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent extends LoadedComponent {
  public name: string;
  public version: string;
  readonly speed: number;
  private percent = 0;

  constructor() {
    super();
    this.speed += 100 * (1 + Math.random());
  }

  public apply(data: DownloadData): void {
    this.name = data.name;
    this.version = data.version;
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

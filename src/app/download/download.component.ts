import {Component, Input} from '@angular/core';
import {Observable, of, timer} from "rxjs";
import {map, takeWhile} from "rxjs/operators";
import {LoadComponentData} from "../component-loader/load-component-data.interface";

export interface DownloadComponentData {
  name: string;
  version: string;
}

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent implements LoadComponentData {
  @Input()
  public data: DownloadComponentData;
  public speed: number;
  public percent = 0;

  constructor() {
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

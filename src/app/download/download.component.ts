import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Download} from "./download";
import {Observable, timer} from "rxjs";
import {map, takeWhile} from "rxjs/operators";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass'],
  providers: [DecimalPipe],
})
export class DownloadComponent implements OnInit {
  @Input()
  public download: Download;

  @Output()
  public complete = new EventEmitter<boolean>();

  private update$: Observable<string>;

  private percent = 0;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    if (!this.download.speed) {
      this.download.speed = this.randomSpeed();
    }
    this.update$ = this.update();
  }

  private randomSpeed(): number {
    return 50 * (1 + Math.random());
  }

  /** Update progress bar */
  public update(): Observable<string> {
    return timer(0, this.download.speed).pipe(
      takeWhile(() => this.percent <= 100),
      map(() => {
        const done = new Array(Math.floor(this.percent / 5) + 1).join('#');
        const remaining = new Array(Math.ceil((100 - this.percent) / 5) + 1).join('-');

        this.complete.emit(this.percent === 100);
        return `${(200 - this.download.speed).toFixed(1)} TiB/ms [${done}${remaining}] ${this.decimalPipe.transform(this.percent++, '3.')}%`;
      })
    );
  }
}

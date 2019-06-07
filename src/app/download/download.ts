import {Observable, of, timer} from 'rxjs';
import {map} from 'rxjs/operators';

export class Download {
  public id: string;
  public name: string;
  public version: string;
  public speed: number;
  public percent = 0;
  public complete = false;

  constructor(name: string, version: string) {
    this.id = `dl${Math.random().toString(36).slice(4)}`;
    this.name = name;
    this.version = version;
    this.speed = 100 * (1 + Math.random());
  }

  /** Start fake download */
  public go(): Observable<boolean> {
    if (!this.complete) {
      /*$('.term-input').before(
        `<div class="term-history download">` +
        `<div id="${this.id}">${this.name} ${this.version}`
      );

      this.update();*/
      this.complete = true;
      return of(true);
    }
  }

  /** Update progress bar */
  public update(): void {
    timer(this.speed).pipe(map(() => {
      const done = new Array(Math.floor(this.percent / 5) + 1).join('#');
      const toDo = new Array(Math.ceil((100 - this.percent) / 5) + 1).join('-');

      /*if (this.percent <= 100) {
        if ($(`.download-progress#${this.id}`)) {
          $(`.download-progress#${this.id}`).remove();
        }

        $(`.download #${this.id}`).after(
          `<div class="download-progress" id="${this.id}">${this.speed.toFixed(1)} TiB/ms [${done}${toDo}] ${this.percent++}%`
        );
      }*/
    }));
  }
}

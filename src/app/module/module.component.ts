import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Module} from "./module";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.sass'],
})
export class ModuleComponent {
  @Input()
  public module: Module;

  @Output()
  public installed = new EventEmitter<boolean>();

  private allComplete = 0;

  /** Install progress for module */
  public installProgress(event: boolean): void {
    this.installed.emit((this.allComplete += event ? 1 : 0) === this.module.downloads.length);
  }
}

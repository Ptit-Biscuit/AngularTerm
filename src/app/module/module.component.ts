import {Component, ViewChild} from "@angular/core";
import {first} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {DownloadComponent} from "../download/download.component";
import {LoadedComponent} from "../component-loader/loaded-component";
import {ComponentLoaderService} from "../component-loader/component-loader.service";
import {Loader} from "../component-loader/loader.directive";
import {ModuleData} from "./module-data.interface";
import {DownloadData} from "../download/download-data.interface";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.sass']
})
export class ModuleComponent extends LoadedComponent {
  public name: string;
  public path: string;
  public downloads: DownloadData[];
  public help: string;
  public installed = false;

  @ViewChild('loader')
  private loader: Loader;

  constructor(private cls: ComponentLoaderService) {
    super();
  }

  public apply(data: ModuleData): void {
    this.name = data.name;
    this.path = data.path;
    this.downloads = data.downloads;
    this.help = data.help;
  }

  /** Install process for module */
  public install(): Observable<boolean> {
    if (!this.installed) {
      this.downloads.forEach(dl => {
          const component = this.cls.loadComponent(this.loader, DownloadComponent, dl) as DownloadComponent;
          component.complete().pipe(first()).subscribe(() => {
            console.log('complete');
          });
        }
      );
    }

    return of(true);
  }
}

import {Component, ComponentFactoryResolver, Input, ViewChild} from "@angular/core";
import {ComponentLoaderDirective} from "../component-loader/component-loader.directive";
import {first} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {LoadComponentData} from "../component-loader/load-component-data.interface";
import {DownloadComponent} from "../download/download.component";

export interface ModuleComponentData {
  name: string;
  path: string;
  downloads: DownloadComponent[];
  help: string;
}

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.sass']
})
export class ModuleComponent implements LoadComponentData {
  @ViewChild(ComponentLoaderDirective)
  public container: ComponentLoaderDirective;

  @Input()
  public data: ModuleComponentData;

  public installed = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /** Install process for module */
  public install(): Observable<boolean> {
    if (!this.installed) {
      this.data.downloads.forEach(dl => {
          const component = this.container.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(DownloadComponent)).instance;
          component.data = dl.data;

          component.complete().pipe(first()).subscribe(() => {
            console.log('complete');
          });
        }
      );
    }

    return of(true);
  }
}

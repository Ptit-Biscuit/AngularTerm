import {NgModule} from '@angular/core';
import {Loader} from "./loader.directive";
import {ModuleComponent} from "../module/module.component";
import {DownloadComponent} from "../download/download.component";

@NgModule({
  declarations: [
    Loader,
  ],
  exports: [
    Loader,
  ],
  entryComponents: [
    DownloadComponent,
    ModuleComponent,
  ],
})
export class ComponentLoaderModule {
}

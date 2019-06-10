import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalComponent} from './terminal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DownloadComponent} from "../download/download.component";
import {ModuleComponent} from "../module/module.component";
import {ComponentLoaderModule} from "../component-loader/component-loader.module";

@NgModule({
  declarations: [
    TerminalComponent,
    DownloadComponent,
    ModuleComponent,
  ],
  exports: [
    TerminalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentLoaderModule,
  ],
  entryComponents: [
    DownloadComponent,
    ModuleComponent,
  ],
})
export class TerminalModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalComponent} from './terminal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DownloadComponent} from "../download/download.component";
import {ModuleComponent} from "../module/module.component";

@NgModule({
  declarations: [
    TerminalComponent,
    DownloadComponent,
    ModuleComponent,
  ],
  exports: [
    TerminalComponent,
    DownloadComponent,
    ModuleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class TerminalModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalComponent} from './terminal.component';

@NgModule({
  declarations: [TerminalComponent],
  exports: [
    TerminalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TerminalModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalComponent} from './terminal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TerminalComponent],
  exports: [
    TerminalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TerminalModule {
}

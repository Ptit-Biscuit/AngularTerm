import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TerminalModule} from './terminal/terminal.module';
import {CommandsModule} from './commands/commands.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TerminalModule,
    CommandsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

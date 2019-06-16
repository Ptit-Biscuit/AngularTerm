import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Commands} from '../commands/commands.enum';
import {Module} from '../module/module';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.sass'],
})
export class TerminalComponent {
  public userPath = '~';
  public input: FormControl = new FormControl('');
  public history: string[] = ['modules open Login'];
  public histIndex: number;
  public outputs: any[] = [];
  @ViewChild('termInput')
  public termInput: ElementRef;
  public modules: Module[] = [];
  public activeModule: Module = null;
  public module: Module = null;
  public installModule = false;

  constructor(private sanitizer: DomSanitizer) {
    this.modules.push(
      {
        name: 'Login',
        path: '~/login',
        downloads: [
          {name: 'Login core', version: '0.56 (beta)'},
          {name: 'Watchdog', version: '4.75'},
          {name: 'Form database', version: '3.1.42'},
        ],
        help: 'help for module <i>Login</i>',
      });
  }

  public submit(command: string) {
    const cmd = command.split(' ');
    this.history.push(command);
    this.outputs.push(`anon@plop ${this.userPath} $ ${command}`);
    this.applyCmd(cmd[0], cmd.slice(1));

    this.termInput.nativeElement.scrollIntoView();
    this.termInput.nativeElement.focus();
    this.input.setValue('');
  }

  public inputHist(evt: KeyboardEvent) {
    // UP => most recent to oldest entry
    const arrowUp = evt.keyCode === 38;
    // DOWN => oldest to most recent
    const arrowDwn = evt.keyCode === 40;

    if ((arrowUp || arrowDwn) && this.history.length > 0) {
      evt.preventDefault();

      // Only allows to go up to enter history entries
      if (this.input.value === '') {
        this.histIndex = arrowUp ? this.history.length : this.history.length - 1;
      }

      if (arrowUp && this.histIndex !== 0) {
        this.input.setValue(this.history[--this.histIndex]);
      } else if (arrowDwn && this.histIndex !== this.history.length - 1) {
        this.input.setValue(this.history[++this.histIndex]);
      }
    }
  }

  public applyCmd(cmd: string, args: string[]): void {
    console.log(cmd, args);

    switch (cmd) {
      case Commands.CLEAR:
        this.outputs = [];
        break;
      case Commands.HISTORY:
        this.outputs = [];
        this.history.slice(0, this.history.length - 1).forEach(out => this.outputs.push(out));
        break;
      case Commands.LOGIN:
        break;
      case Commands.MODULES:
        switch (args[0]) {
          case Commands.MODULES_OPEN:
          case Commands.MODULES_ACTIVATE:
            const module = args[1] as string;

            if (!module) {
              this.outputs.push('Module name is required');
              break;
            }

            if (this.modules.map(m => m.name).includes(module)) {
              this.module = this.modules.find(m => m.name === module);
              this.installModule = true;
            } else {
              this.outputs.push(`Module '${module}' cannot be found`);
            }
            break;
          case Commands.MODULES_LIST:
            this.modules.forEach(mod => this.outputs.push(mod.name));
            break;
          case Commands.MODULES_CLOSE:
          case Commands.MODULES_DEACTIVATE:
            this.activeModule = null;
            this.userPath = '~';
            break;
          default:
          case Commands.HELP:
            this.outputs.push(this.sanitizer.bypassSecurityTrustHtml(this.activeModule.help));
            break;
        }
        break;
      default:
      case Commands.HELP:
        this.outputs.push('default help');
        break;
    }
  }

  public installComplete(complete: boolean): void {
    if (complete) {
      this.outputs.push(`Downloads complete. Module '${this.module.name}' successfully installed`);
      this.activeModule = this.module;
      this.userPath = this.module.path;
      this.installModule = false;
    }
  }
}

import {Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Commands} from '../commands/commands.enum';
import {ModuleComponent} from '../module/module.component';
import {first, map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ComponentLoaderService} from "../component-loader/component-loader.service";
import {Loader} from "../component-loader/loader.directive";
import {ModuleData} from "../module/module-data.interface";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent {
  public userPath = '~';
  public input: FormControl = new FormControl('');
  public history: string[] = ['modules open Login'];
  public histIndex: number;
  public outputs: any[] = [];
  @ViewChild('termInput')
  public termInput: ElementRef;
  public modules: ModuleData[] = [];
  public activeModule: ModuleComponent = null;
  @ViewChildren(Loader)
  public loader: Loader;

  constructor(private cls: ComponentLoaderService) {
    this.modules.push({
      name: 'Login',
      path: '~/login',
      downloads: [
        {name: 'Login core', version: '0.56 (beta)'},
        {name: 'Watchdog', version: '4.75'},
        {name: 'Form database', version: '3.1.42'},
      ],
      help: 'help for module <i>Login</i>'
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

    switch (Commands[cmd.toUpperCase()]) {
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
              this.outputs.push('ModuleComponent name is required');
              break;
            }

            if (this.modules.map(m => m.name).includes(module)) {
              this.startModuleInstall(this.modules.find(m => m.name === module));
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
            this.outputs.push('blabla');
            break;
        }
        break;
      default:
      case Commands.HELP:
        this.outputs.push('blabla');
        break;
    }
  }

  public startModuleInstall(moduleData: ModuleData): Observable<any> {
    const module = this.cls.loadComponent(this.loader, ModuleComponent, moduleData) as ModuleComponent;

    return module.install().pipe(
      first(),
      map(() => {
        this.outputs.push(`Downloads complete. Module '${module.name}' successfully installed`);
        this.activeModule = module;
        this.userPath = module.path;
      })
    );
  }
}

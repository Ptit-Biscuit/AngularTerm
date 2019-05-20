import {Injectable} from '@angular/core';
import {CommandsModule} from './commands.module';
import {Commands} from './commands.enum';

@Injectable({
  providedIn: CommandsModule
})
export class CommandsService {
  public getCmd(cmd: Commands, args: string | string[]): string {
    console.log(cmd, args);
    switch (cmd) {
      case Commands.CLEAR:
        console.log('clear');
        return `<div class="term-history">clear`;
      case Commands.HISTORY:
        console.log('history');
        return ``;
      case Commands.LOGIN:
        console.log('login');
        return ``;
      case Commands.MODULES:
        switch (args[0]) {
          case Commands.MODULES_OPEN:
          case Commands.MODULES_ACTIVATE:
            console.log('modules open / activate');
            return ``;
          case Commands.MODULES_LIST:
            console.log('modules list');
            return ``;
          case Commands.MODULES_CLOSE:
          case Commands.MODULES_DEACTIVATE:
            console.log('modules close / deactivate');
            return ``;
          default:
          case Commands.HELP:
            console.log('modules help');
            return ``;
        }
        break;
      default:
      case Commands.HELP:
        console.log('help');
        return ``;
    }
  }
}

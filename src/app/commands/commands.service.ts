import {Injectable} from '@angular/core';
import {CommandsModule} from './commands.module';
import {Commands} from './commands.enum';

@Injectable({
  providedIn: CommandsModule
})
export class CommandsService {
  public applyCmd(cmd: string, args: string[]): () => any {
    console.log(cmd, args);

    switch (Commands[cmd.toUpperCase()]) {
      case Commands.CLEAR:
        return () => {
        };
      case Commands.HISTORY:
        return () => {
        };
      case Commands.LOGIN:
        return () => {
        };
      case Commands.MODULES:
        switch (args[0]) {
          case Commands.MODULES_OPEN:
          case Commands.MODULES_ACTIVATE:
            return () => {
            };
          case Commands.MODULES_LIST:
            return () => {
            };
          case Commands.MODULES_CLOSE:
          case Commands.MODULES_DEACTIVATE:
            return () => {
            };
          default:
          case Commands.HELP:
            return () => {
            };
        }
        break;
      default:
      case Commands.HELP:
        return () => {
        };
    }
  }
}

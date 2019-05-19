import {Injectable} from "@angular/core";
import {CommandsModule} from "./commands.module";
import {Commands} from "./commands.enum";

@Injectable({
  providedIn: CommandsModule
})
export class CommandsService {
  public getCmd(cmd: Commands, args: string | string[]): Function {
    console.log(cmd, args);
    switch (cmd) {

      case Commands.CLEAR:
        return () => {
          console.log('clear');
        };
      case Commands.HISTORY:
        return () => {
          console.log('history');
        };
      case Commands.LOGIN:
        return () => {
          console.log('login');
        };
      case Commands.MODULES:
        switch (args[0]) {
          case Commands.MODULES_OPEN:
          case Commands.MODULES_ACTIVATE:
            return () => {
              console.log('modules open / activate');
            };
          case Commands.MODULES_LIST:
            return () => {
              console.log('modules list');
            };
          case Commands.MODULES_CLOSE:
          case Commands.MODULES_DEACTIVATE:
            return () => {
              console.log('modules close / deactivate');
            };
          default:
          case Commands.HELP:
            return () => {
              console.log('modules help')
            }
        }
        break;
      default:
      case Commands.HELP:
        return () => {
          console.log('help');
        };
    }
  }
}

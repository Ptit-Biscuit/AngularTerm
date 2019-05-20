import {Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommandsService} from '../commands/commands.service';
import {Commands} from '../commands/commands.enum';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent {
  public input: FormControl = new FormControl();

  @ViewChild('termInput')
  public termInput: HTMLElement;

  constructor(private commandsService: CommandsService) {
  }

  public submit(command: string) {
    const cmd = command.split(' ');
    const res = this.commandsService.getCmd(Commands[cmd[0].toUpperCase()], cmd.slice(1));
    console.log(res);
    // this.termInput.insertBefore(res, null);
    this.input.setValue('');
  }
}

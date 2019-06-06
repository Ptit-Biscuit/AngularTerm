import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommandsService} from '../commands/commands.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent {
  public input: FormControl = new FormControl('');

  @ViewChild('termInput')
  public termInput: ElementRef;

  @ViewChild('before')
  public before: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  public output(out: string): HTMLDivElement {
    const output: HTMLDivElement = this.renderer.createElement('div');
    output.setAttribute('class', 'term-history');
    output.innerHTML = out;

    return output;
  }

  public submit(command: string) {
    const cmd = command.split(' ');
    this.termInput.nativeElement.before(this.output(`${this.before.nativeElement.outerHTML}${cmd.join(' ')}`));
    this.termInput.nativeElement.before(this.output(CommandsService.applyCmd(cmd[0], cmd.slice(1))()));
    this.termInput.nativeElement.scrollIntoView();
    this.termInput.nativeElement.focus();
    this.input.setValue('');
  }
}

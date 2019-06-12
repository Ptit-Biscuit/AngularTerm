import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[loader]'
})
export class Loader {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

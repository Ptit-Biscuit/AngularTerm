import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[load]'
})
export class ComponentLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

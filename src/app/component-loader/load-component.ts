import {Type} from "@angular/core";

export class LoadComponent<T> {
  constructor(public component: Type<T>, public data: any) {}
}

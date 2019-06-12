import {LoadedComponentData} from "./loaded-component-data.interface";

export abstract class LoadedComponent {
  protected constructor() {}

  public abstract apply(data: LoadedComponentData): void;
}

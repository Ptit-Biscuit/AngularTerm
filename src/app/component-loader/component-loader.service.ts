import {ComponentFactoryResolver, Injectable, Type} from '@angular/core';
import {LoadedComponent} from "./loaded-component";
import {Loader} from "./loader.directive";
import {LoadedComponentData} from "./loaded-component-data.interface";

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public loadComponent(loader: Loader, type: Type<LoadedComponent>, data: LoadedComponentData): LoadedComponent {
    const loadedComponent = loader.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(type)).instance;
    loadedComponent.apply(data);
    return loadedComponent;
  }
}

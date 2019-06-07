import {Download} from '../download/download';

export class Module {
  public name: string;
  public path: string;
  public downloads: Download[];
  public help: string;
  public installed = false;

  constructor(name, path, downloads: Download[] = [], help = '') {
    this.name = name;
    this.path = path;
    this.downloads = downloads;
    this.help = help;
  }

  /** Install process for module */
  public install(): void {
    if (!this.installed) {
      this.downloads.forEach(dl =>
        dl.go().subscribe((complete: boolean) => {
            this.installed = complete;
        })
      );
    }
  }
}

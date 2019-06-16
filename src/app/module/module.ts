import {Download} from '../download/download';

export interface Module {
  name: string;
  path: string;
  downloads: Download[];
  help: string;
}

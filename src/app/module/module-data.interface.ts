import {DownloadData} from "../download/download-data.interface";
import {LoadedComponentData} from "../component-loader/loaded-component-data.interface";

export interface ModuleData extends LoadedComponentData {
  name: string;
  path: string;
  downloads: DownloadData[];
  help: string;
}

import {IFile} from './IFile';

export interface News {
  id: number;
  title: string;
  preview: string;
  image?: IFile;
  text: string;
}

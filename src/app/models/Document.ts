import {Category} from './Category';
import {IFile} from './IFile';

export interface Document {
  id?: number;
  name: string;
  file: IFile;
  category: Category;
}

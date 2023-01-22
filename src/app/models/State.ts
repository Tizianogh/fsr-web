import { StateEnum } from '../enum/state.enum';

export interface State<T> {
  state: StateEnum;
  appData?: T;
  error?: string;
}

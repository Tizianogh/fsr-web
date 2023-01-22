export interface Response<T> {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  developerMessage: string;
  data: { results: T[]; result?: T };
}

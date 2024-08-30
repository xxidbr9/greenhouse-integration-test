export type ResponseType<T> = {
  message: string;
  data: T;
};

export type NetworkType<T> = Promise<ResponseType<T>>;

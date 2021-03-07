import rootReducer from './rootReducer';

export type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertyTypes<T>>;
export type AppStore = ReturnType<typeof rootReducer>;

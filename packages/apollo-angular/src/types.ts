import {ApolloClientOptions} from 'apollo-client';

export type R = Record<string, any>;

export type TypedVariables<T> = {
  variables?: T;
};

export type NamedOptions = {
  default: ApolloClientOptions<any>;
  [name: string]: ApolloClientOptions<any>;
};

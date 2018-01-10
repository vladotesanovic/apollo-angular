import {InjectionToken} from '@angular/core';
import {ApolloClientOptions} from 'apollo-client';

import {NamedOptions} from './types';

export const ApolloOptionsToken = new InjectionToken<ApolloClientOptions<any>>(
  'ApolloOptionsToken',
);

export const ApolloNamedOptionsToken = new InjectionToken<NamedOptions>(
  'ApolloNamedOptionsToken',
);

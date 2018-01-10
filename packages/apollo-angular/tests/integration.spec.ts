import {setupAngular} from './_setup';

import {TestBed, inject, async} from '@angular/core/testing';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {mockSingleLink} from './mocks/mockLinks';

import {
  Apollo,
  ApolloModule,
  ApolloOptionsToken,
  ApolloNamedOptionsToken,
} from '../src';

describe('Integration', () => {
  beforeAll(() => setupAngular());

  describe('default', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, ApolloModule],
        providers: [
          {
            provide: ApolloOptionsToken,
            useFactory: () => {
              return {
                link: mockSingleLink(),
                cache: new InMemoryCache(),
              };
            },
          },
        ],
      });
    });

    test(
      'should be ready',
      async(
        inject([Apollo], (apollo: Apollo) => {
          expect(() => {
            apollo.getClient();
          }).not.toThrow();
        }),
      ),
    );
  });

  describe('named', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, ApolloModule],
        providers: [
          {
            provide: ApolloNamedOptionsToken,
            useFactory: () => {
              return {
                default: {
                  link: mockSingleLink(),
                  cache: new InMemoryCache(),
                },
                extra: {
                  link: mockSingleLink(),
                  cache: new InMemoryCache(),
                },
              };
            },
          },
        ],
      });
    });

    test(
      'should contain default client',
      async(
        inject([Apollo], (apollo: Apollo) => {
          expect(() => {
            apollo.getClient();
          }).not.toThrow();

          expect(apollo.getClient().cache).toBeInstanceOf(InMemoryCache);
        }),
      ),
    );
    test(
      'should contain named client',
      async(
        inject([Apollo], (apollo: Apollo) => {
          expect(() => {
            apollo.use('extra').getClient();
          }).not.toThrow();

          expect(apollo.use('extra').getClient().cache).toBeInstanceOf(
            InMemoryCache,
          );
        }),
      ),
    );
  });
});

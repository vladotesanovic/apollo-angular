---
title: Multiple clients
---

With `apollo-angular` it is possible to use multiple Apollo Clients in your
application.

<h2 id="creating-clients">Creating clients</h2>

You are already familiar with how to create a single client so it should be easy
to understand it.

There are few ways of creating named clients.

One way is to use `Apollo.create`. Normally, you would use it like this:

```ts
apollo.create(options);
```

This will define a default client but there is one optional argument.

```ts
apollo.create(options, name?)
```

An example:

```ts
apollo.create(defaultOptions);
apollo.create(extraOptions, 'extra');
```

Now you have the default client and one called `extra`.

> Important thing to know is if you want to define a default client, simply do
> not use any `name` argument or set it to `default`.

The other way is to use helper methods.

```ts
apollo.createDefault(options);
// and
apollo.createNamed(name, options);
```

There is also an alternative approach to do that by using Angular's Dependency
Injection.

As for a single client there is a `InjectionToken` to define options for
multiple clients, or named clients if you prefer. It is called
`ApolloNamedOptionsToken`.

```ts
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApolloNamedOptionsToken, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  imports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: ApolloNamedOptionsToken,
      useFactory: httpLink => {
        return {
          default: {
            link: httpLink.create({uri: 'https://api.example.com/graphql'}),
            cache: new InMemoryCache(),
          },
          extra: {
            link: httpLink.create({
              uri: 'https://api.example.com/graphql-extra',
            }),
            cache: new InMemoryCache(),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
class AppModule {}
```

You probably noticed that we return an object with two properties: `default` and
`extra`.

This will create the default client and one client under `extra` name.

<h2 id="using-apollo">Using Apollo</h2>

Since we have our clients available in an app, now is the time to see how to use
them.

If a client is defined as the default, you can directly use all methods of the
`Apollo` service.

About named clients, simply use the method called `use(name: string)`.

```ts
import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

@Component({...})
export class AppComponent {
  feedQuery: QueryRef<any>;

  constructor(apollo: Apollo) {
    // use default
    this.feedQuery = apollo.watchQuery({...});

    // use extra client
    this.feedQuery = apollo.use('extra').watchQuery({...});
  }
}
```

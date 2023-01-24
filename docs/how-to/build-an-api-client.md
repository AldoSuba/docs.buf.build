---
id: build-an-api-client-with-buf
title: Build an API client the Buf way
---

import { Card, Cards } from "@site/src/components/Cards";

:::danger 🚧 Construction Notes

This HOW TO GUIDE is **oriented to a goal** and must show how to solve the specific problem of using remote packages in
a web client. Its form, a series of steps - analogous to a recipe in a cookery book

:::

<Cards>
  <Card
    name="Connect"
    url="https://connect.build/"
    description="If you're tired of hand-written boilerplate and turned off by massive frameworks, Connect is for you."
  />
  <Card
    name="Connect-Web"
    url="https://buf.build/blog/connect-web-protobuf-grpc-in-the-browser"
    description="It's time for Protobuf and gRPC to be your first choice in the browser"
  />
</Cards>


[//]: # (Open with a warm welcome)

Welcome to the exciting new world of building a web client with remote packages! In this guide, we'll be taking a
journey through the process of creating a sleek and functional web application, all while utilizing the power of
remote packages.

You'll learn how to easily incorporate pre-built, reusable code into your project, saving you valuable time and energy.
And with the ability to access and use packages created by other developers, you'll have access to a wealth of
functionality and features that would otherwise be difficult to create from scratch.

So grab your favorite beverage, get comfortable, and let's dive into the world of remote packages and building a
client!

:::info Before you begin

We will assume you have already configured your `npm` environment to work with the Buf Schema Registry and Remote
Packages. If you haven't, head on over to our [installation guide](/bsr/remote-packages/npm) first.

:::

The Buf Schema Registry provides remote packages for [JavaScript][javascript] and [TypeScript][typescript]: consume
generated SDKs from modules and plugins using dependency management tools like [NPM][npm] and [Yarn][yarn].

:::danger 🚧 Construction Notes

Introduce the web client codebase which will connect to the eliza service `demo.connect.build`

:::

Connect-Web is a simple library by Buf that allows developers to call remote procedures from a web browser. Unlike REST,
you get a type-safe client and never have to think about serialization again. It provides a set of functions that allows
you to define HTTP routes and their associated handlers in Protocol Buffers so that your front end and back end teams
have an easy way to define and handle endpoints in your web service, eliminating errors frequently found when
hand-rolling rpc stubs.

:::danger 🚧 Construction Notes

Navigate to [`bufbuild/eliza`](https://buf.build/bufbuild/eliza), introduce documentation, code & end on "assets"

:::

It provides a set of helper functions for common functionality such as JSON handling, request and response validation
and logging.

```terminal
npm install @buf/bufbuild_eliza.bufbuild_connect-web
npm install @buf/bufbuild_eliza.bufbuild_es
```

```terminal
curl \
    --header 'Content-Type: application/json' \
    --data '{"sentence": "I feel happy."}' \
    https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence": "Feeling happy? Tell me more."} 
```

Connect-web is designed to work with the Buf tool and its Protocol Buffer language, and it's a great tool for developers
who are already familiar with Protocol Buffers, and want to use it to connect their web services. It is a lightweight,
easy-to-use, and powerful library that is perfect for building APIs and web applications with Protocol Buffers.

It's also worth noting that Connect-web is designed to work seamlessly with the Buf CLI, which is a set of command-line
tools that helps developers build, lint, and update their Protocol Buffer code safely. This integration allows
developers to easily manage their protobuf schemas and automatically generate code for their web service, further
simplifying the development process.

[//]: #TODO (Include an invitation to return)

Connect-web is open source and actively maintained by Buf, it's actively used by many companies and developers,
it's a great choice for any developer looking to build web services with Protocol Buffers and Go.

[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[typescript]: https://www.typescriptlang.org/

[npm]: https://npmjs.org

[yarn]: https://yarnpkg.com

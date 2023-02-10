---
id: getting-started
title: Getting started
---

Connect-Node is a library for serving Connect, gRPC, and gRPC-Web compatible HTTP APIs using Node.
It brings the Connect Protocol to Node with full TypeScript compatibility and support for all four types of remote
procedure calls: unary and the three variations of streaming.

This fifteen-minute walkthrough helps you create a small Connect service in Node using the package `http2` to stand up
a server. It demonstrates what you'll be writing by hand, what Connect generates for you,
and how to call your new API.

## Prerequisites

* You'll need [Node.js](https://nodejs.dev/en/download) installed - we recommend the
  most recent long-term support version (LTS).
* We'll use the package manager `npm`, but we are also compatible with `yarn` and `pnpm`.
* We'll use the `buf` CLI to generate code. See [the documentation](https://docs.buf.build/installation)
  for installation instructions.

## Project Setup

Next, we'll setup a project from scratch and then augment it to serve our endpoints with Connect-Node.

### Scaffold a new project

The below steps will scaffold a bare-bones Node server.  First, let's initialize the project:

```bash
$ mkdir connect-node-example
$ cd connect-node-example
$ npm init -y
$ npm install typescript tsx
$ npx tsc --init
```

Next, let's create a simple server using `http2`. Note that we are standing up an HTTP/2 server serving cleartext, 
i.e. H2C.  Connect-Node supports both HTTP/1.1 and HTTP/2, but we are using H2C here so that we can show compatibility 
with gRPC clients.  To convert this example to HTTP/1.1, change all `http2` references to `http`. 

Create a new file called `server.ts`:

```bash
touch server.ts
```

And inside this file, add the following code:

```javascript
import http2 from "http2";

http2.createServer({}, (_, res) => res.end("Hello World!"))
    .listen(8080, () => console.log("Server running at http://localhost:8080"));
```


Your project should now have the following tree:

```bash
.
├── server.ts
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json
```

At this point, you should have a working server in your `connect-node-example` directory.  To start the server, 
run the following:

```bash
$ npx tsx server.ts
```

You should then be able to run the following command in another terminal and see the text "Hello World!".  

```bash
curl http://localhost:8080 --http2-prior-knowledge
```

## Integrate Connect-Node

Now that our project is ready, let's start to integrate Connect-Node and Protobuf.  

### Add a service definition

First, we need to add a Protobuf file that includes our service definition.  For this tutorial, we are going to 
construct a unary endpoint for a service that is a stripped-down implementation of 
[ELIZA](https://en.wikipedia.org/wiki/ELIZA), the famous natural language processing program.

```bash
$ mkdir -p proto && touch proto/eliza_service.proto
```

Open up the above file and add the following service definition:

```protobuf
syntax = "proto3";

package buf.connect.demo.eliza.v1;

message SayRequest {
    string sentence = 1;
}

message SayResponse {
    string sentence = 1;
}

service ElizaService {
    rpc Say(SayRequest) returns (SayResponse) {}
}
```

Next, create a `buf.gen.yaml` configuration file that will configure how to generate our code.  For more details, 
see https://docs.buf.build/configuration/v1/buf-gen-yaml

```bash
touch buf.gen.yaml
```

Inside the file, add the following:

```yaml
version: v1
plugins:
  - name: es 
    path: node_modules/.bin/protoc-gen-es
    opt: target=ts
    out: gen
  - name: connect-web
    path: node_modules/.bin/protoc-gen-connect-web
    opt: target=ts
    out: gen
```

Then, install Connect-Node and the code generator plugin we'll use to generate our service definitions from Protobuf.

```bash
$ npm install @bufbuild/connect-node @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-web
```

### Generate code

Now we're going to generate code based on service definitions in a Protobuf file.  

```bash
$ buf generate
```

You should now see two generated files located at `gen/proto` named `eliza_service_connectweb.ts` and 
`eliza_service_pb.ts`.  We are going to use these files to create our endpoint.

## Add handlers

Let's add a handler for our `ElizaService` using the `createHandlers` function from Connect-Node.  The function accepts 
your generated service definition and then an object implementing your endpoints.

Open the file `server.ts` and make the following changes:

```diff
import http2 from "http2";
+ import { createHandlers, mergeHandlers } from "@bufbuild/connect-node";
+ import { ElizaService } from "./gen/proto/eliza_service_connectweb.js";

+ const handlers = createHandlers(ElizaService, {
+    say(req) {
+        return {
+            sentence: `You said ${req.sentence}`,
+        };
+    },
+ });

+ http2.createServer({}, mergeHandlers(handlers))
    .listen(8080, () => console.log("Server running at http://localhost:8080"));
- http2.createServer({}, (_, res) => res.end("Hello World!"))
    .listen(8080, () => console.log("Server running at http://localhost:8080"));
```

Congratulations.  Your endpoint is ready to go!  You should be able to start your server again using `npx tsx server.ts`.

## Testing

### buf curl

We recommend using [`buf curl`](https://docs.buf.build/curl/usage) to test our endpoint.  Because Connect-Node is 
compatible with Connect, gRPC, and gRPC-Web, `buf curl` will allow us to easily toggle between these protocols to 
verify they are all supported:

```terminal title="Connect Protocol (Default)"
$ buf curl --http2-prior-knowledge --schema ./proto -d '{"sentence": "I feel happy."}' \
   http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence":"You said I feel happy."}
```

```terminal title="gRPC Protocol"
$ buf curl --http2-prior-knowledge --protocol grpc --schema ./proto -d '{"sentence": "I feel happy."}' \
   http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence":"You said I feel happy."}
```

```terminal title="gRPC-Web Protocol"
$ buf curl --http2-prior-knowledge --protocol grpcweb --schema ./proto -d '{"sentence": "I feel happy."}' \
   http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence":"You said I feel happy."}
```

### cURL

Of course, because Connect is POST-only protocol that works over HTTP/1.1 and HTTP/2, we can use `curl` to test our
endpoint also:

```terminal
$ curl \
  --http2-prior-knowledge \
  --header 'Content-Type: application/json' \
  --data '{"sentence": "I feel happy."}' \
   http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence":"You said I feel happy."}
```


## Conclusion

And that's it.  We took a skeleton Hello World Node server and with a few lines were able to implement a unary endpoint
with a fully-defined schema.  Now let's take a deeper look at what Connect-Node has to offer.

---
sidebar_position: 2
id: getting-started
title: Define a Service
description: "Transform Your Go API Building Game with Buf and Connect: Create Lightning-Fast, Efficient, and Effortless
APIs in Just 15 Minutes!"
---

## Prerequisites

* You'll need one of the [last two major releases][go-releases] of Go, with a minimum of Go 1.18. See
  Go's [Getting Started][install-go] guide for installation instructions.

## Install tools

First, we'll need to create a new Go module and install some code generation tools:

```terminal
$ mkdir buf-go-example
$ cd buf-go-example
$ go mod init example
$ go install github.com/bufbuild/buf/cmd/buf@latest
$ go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

You'll need `buf`, `protoc-gen-go` on your `PATH`. If `which buf grpcurl protoc-gen-go` doesn't succeed, add Go's
install directories to your path:

```terminal
$ [ -n "$(go env GOBIN)" ] && export PATH="$(go env GOBIN):${PATH}"
$ [ -n "$(go env GOPATH)" ] && export PATH="$(go env GOPATH)/bin:${PATH}"
```

## Define a service

Now we're ready to write the Protocol Buffer schema that defines our service. In your shell,

```terminal
$ mkdir -p greet/v1
$ touch greet/v1/greet.proto
```

Open `greet/v1/greet.proto` in your editor and add:

```protobuf
syntax = "proto3";

package greet.v1;

option go_package = "example/gen/greet/v1;greetv1";

message GreetRequest {
  string name = 1;
}

message GreetResponse {
  string greeting = 1;
}

service GreetService {
  rpc Greet(GreetRequest) returns (GreetResponse) {}
}
```

This file declares the `greet.v1` Protobuf package, a service called `GreetService`, and a single method called `Greet`
with its request and response structures. These package, service, and method names will reappear soon in our HTTP API's
URLs.

## Lint & Format

First, scaffold a basic [`buf.yaml`][buf.yaml] by running `buf mod init`.

With this configuration file in place, you can lint and format your schema:

```terminal
$ buf lint
$ buf format
```

## Generate code

We're going to generate our code using [Buf][buf], a modern replacement for Google's protobuf compiler. We installed Buf
earlier, but we also need a few configuration files to get going. (If you'd prefer, you can skip this section and
use `protoc` instead &mdash; `protoc-gen-connect-go` behaves like any other plugin.)

Next, tell Buf how to generate code by putting this into [`buf.gen.yaml`][buf.gen.yaml]:

```yaml
version: v1
plugins:
  - name: go
    out: gen
    opt: paths=source_relative
```

With those configuration files in place, you can lint your schema and generate code:

```terminal
$ buf generate
```

In your `gen` directory, you should now see some generated Go:

```
gen
└── greet
    └── v1
        └── greet.pb.go
```

The package `gen/greet/v1` contains `greet.pb.go`, which was generated by Google's `protoc-gen-go`, and it contains
the `GreetRequest` and `GreetResponse` structs and the associated marshaling code.

## Next steps

import Feedback from './_feedback.mdx';

<Feedback/>

[buf]: https://buf.build/

[buf.gen.yaml]: https://docs.buf.build/configuration/v1/buf-gen-yaml

[buf.yaml]: https://docs.buf.build/configuration/v1/buf-yaml

[buf-cli]: https://github.com/bufbuild/buf

[cURL]: https://curl.se/

[godoc]: https://pkg.go.dev/github.com/bufbuild/connect-go

[go-releases]: https://golang.org/doc/devel/release

[grpc-web]: https://github.com/grpc/grpc-web

[install-go]: https://golang.org/doc/install

[protobuf]: https://developers.google.com/protocol-buffers
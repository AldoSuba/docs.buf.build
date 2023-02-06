---
id: managed-mode-usage
title: Managed mode usage
---

In this guide, you'll learn how to use [**managed mode**](managed-mode.md)
when [generating code](usage.mdx) using Protobuf. Managed mode is a configuration option in
your [`buf.gen.yaml`](/configuration/v1/buf-gen-yaml.md) that tells `buf` to set all the [file options] in your module
according to an opinionated set of values suitable for each of the supported Protobuf languages, such as Go, Java, and
C#. Those file options are written _on the fly_ so that you can remove them from your `.proto` source files.

> We created managed mode because those file options have long been a source of confusion and frustration for Protobuf
> users.

## Purpose

One of the drawbacks of using Protobuf in the past has been the need to hard-code language-specific options within
Protobuf definitions themselves. Consider the `go_package` option in this example:

```protobuf title="petapis/pet/v1/pet.proto" {5}
syntax = "proto3";

package pet.v1;

option go_package = "github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1;petv1";
```

This option is required by `proto` and `protoc-gen-go` but it has nothing to do with the actual API definition in
Protobuf. It's an API _consumer_ concern, not an API _producer_ concern. Different consumers may&mdash;and usually
do&mdash;want to provide custom values for this option, especially when a set of Protobuf definitions has many
consumers.

With managed mode, we can remove the `go_package` option altogether, as in these two diffs:

```protobuf title="petapis/pet/v1/pet.proto" {5}
 syntax = "proto3";

 package pet.v1;

-option go_package = "github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1;petv1";
```

If we were to generate Go code stubs for the API changes made in this example, we'd notice this:

```terminal
$ rm -rf gen
$ buf generate
---
protoc-gen-go: unable to determine Go import path for "payment/v1alpha1/payment.proto"

Please specify either:
	• a "go_package" option in the .proto source file, or
	• a "M" argument on the command line.

See https://developers.google.com/protocol-buffers/docs/reference/go-generated#package for more information.
...
```

This error comes up because we haven't yet enabled managed mode, let us take a look at how we would do that.

## Configuration

To configure managed mode, add the [`managed.enabled`](/configuration/v1/buf-gen-yaml#enabled) option to
your `buf.gen.yaml` template and set a package prefix with
the [`managed`](/configuration/v1/buf-gen-yaml#go_package_prefix) parameter.

:::note
The `go_package` option is [notoriously complicated][go_prefix]. To generate code using plugins like `protoc-gen-go`
and `protoc-gen-grpc`, Go repositories **must** contain a [go.mod][go.mod] file that declares a Go [module path][path]
that acts as a prefix for package import paths within the module.
:::

With managed mode you don't have to worry about this nuanced behavior. You can set the `go_package_prefix.default` value
to the `name` in your `go.mod` joined with the `out` path configured for the `protoc-gen-go` plugin. In the example
below, the module path (`github.com/bufbuild/buf-tour/petstore`) and the plugin output path (`gen/proto/go`) result in
a [`go_package_prefix.default`](/configuration/v1/buf-gen-yaml#default) setting
of `github.com/bufbuild/buf-tour/petstore/gen/proto/go`.

The original `go.mod` file:

```sh title="go.mod" {1}
module github.com/bufbuild/buf-tour/petstore

go 1.16

require (
	google.golang.org/genproto v0.0.0-20210811021853-ddbe55d93216
	google.golang.org/grpc v1.40.0
	google.golang.org/protobuf v1.27.1
)
```

And the corresponding Buf configuration:

```yaml title="buf.gen.yaml" {3-5}
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/bufbuild/buf-tour/petstore/gen/proto/go
plugins:
  - plugin: go
    out: gen/proto/go
    opt: paths=source_relative
  - plugin: grpc-go
    out: gen/proto/go
    opt: paths=source_relative
```

## Exclude

Looking at our example from above, if we try to compile the Go code, we'd be presented with this error:

```terminal
$ go build ./...
---
gen/proto/go/pet/v1/pet.pb.go:10:2: no required module provides package github.com/bufbuild/buf-tour/petstore/gen/proto/go/google/type; to add it:
	go get github.com/bufbuild/buf-tour/petstore/gen/proto/go/google/type
```

In this case, `buf` overrides the `go_package` value for the `buf.build/googleapis/googleapis` module, but Google
publishes their Go Protobuf stubs to a separate [`go-genproto`][go-genproto] repository, which is controlled by
a `go_package` setting like this:

```protobuf title="google/rpc/status.proto" {8}
syntax = "proto3";

package google.rpc;

import "google/protobuf/any.proto";

option cc_enable_arenas = true;
option go_package = "google.golang.org/genproto/googleapis/rpc/status;status";

...
```

Unfortunately, the [`grpc-go`][grpc-go] library depends on [`go-genproto`][go-genproto], so the import paths must match
for the Go stubs to interoperate and the `go_package` option **must** be preserved.

### Configuration {#exclude-configuration}

:::tip This is rare
This is a particularly rare edge case, which primarily applies to `buf.build/googleapis/googleapis`. You shouldn't
need to use the `except` key in general.
:::

You can fix these errors by _excluding_ the `buf.build/googleapis/googleapis` module from managed mode:

```yaml title="buf.gen.yaml" {6-7}
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/bufbuild/buf-tour/petstore/gen/proto/go
    except:
      - buf.build/googleapis/googleapis
plugins:
  - plugin: java
    out: gen/proto/java
  - plugin: go
    out: gen/proto/go
    opt: paths=source_relative
  - plugin: go-grpc
    out: gen/proto/go
    opt:
      - paths=source_relative
      - require_unimplemented_servers=false
```

With the `except` setting, the `go_package` option in all the files provided by the `buf.build/googleapis/googleapis`
module is no longer managed by `buf`. In other words, the `go_package` option remains untouched for this set of files.

[file options]: https://developers.google.com/protocol-buffers/docs/proto3#options

[go.mod]: https://golang.org/ref/mod#go-mod-file

[go_prefix]: https://developers.google.com/protocol-buffers/docs/reference/go-generated#package

[go-genproto]: https://github.com/googleapis/go-genproto

[grpc-go]: https://github.com/grpc/grpc-go

[path]: https://golang.org/ref/mod#glos-module-path

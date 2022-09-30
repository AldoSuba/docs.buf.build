---
id: roadmap
title: Roadmap
---

What you see today is the start of a larger paradigm shift in how we understand and reason about API
schemas.

Here, we outline products on our roadmap. [Contact us](contact.md) to discuss our existing roadmap
or any other products you'd like to see.

## The Buf Schema Registry (BSR) {#bsr}

### Remote client and server library generation

One of the promises of the BSR is on demand generation of your APIs. At a high level, we want
modules to have stubs generated on demand, for every version and every possible Protobuf plugin,
with consumption via language-native mechanisms.

This feature is currently available for Buf's
[Go module proxy](bsr/remote-generation/overview.md#go-module-proxy) which is currently in
**alpha**. Given a BSR name `buf.build/acme/weather`, you can consume generated code for:

- Plugin `protoc-gen-go` version `1.4.0`
- Plugin `protoc-gen-go-grpc` version `1.0.0`

via a `go` command that results in a Go module:

```terminal
$ go get go.buf.build/grpc/go/acme/weather
```

Similar mechanisms exist for other languages, such as:

- NPM packages
- Maven repositories
- Python packages
- Ruby gems
- Tarballs

This enables users to use Protobuf definitions without needing to interact with `buf` and instead
consume APIs like third-party libraries in their native coding language. This is especially powerful
as we move towards a world where Protobuf is used to build both internal and external APIs.

### Enforced linting and compatibility

The BSR currently leans on the module author to verify that proposed snapshots are backwards
compatible before pushing a module. While `buf breaking` is helpful, breakages are not uncommon and
can leave applications in a broken state.

If instead, we enforce backwards-compatibility for modules **on the server side** and extend this to
`buf lint`, this unlocks huge potential with respect to updating dependencies. By guaranteeing that
the latest snapshot is compatible with all previous snapshots via Protobuf API compatibility,
consumers can resolve the latest dependency snapshots without breaking customer applications.

### Solving the diamond dependency problem

It's only a matter of time until the
[Diamond Dependency Problem](https://en.wikipedia.org/wiki/Dependency_hell) manifests itself in
dependency management systems. Historically, these issues can only be verified at build time because
the dependency management solution attempts a "best effort" whereby the developer tries to compile
their code after their dependencies have been resolved but fails to do so due to
backwards-incompatible API changes.

By virtue of Protobuf API compatibility, rules and Buf's powerful compatibility tooling, the BSR is
uniquely positioned to solve this problem. The BSR receives all of the dependencies requested for a
specific module, and can systematically determine the latest version that is compatible with _all_
of the provided versions with Buf's compatibility checker. If such a version does not exist, the BSR
can give an informative error that describes exactly _why_ the dependencies could not be resolved,
and the developer can simply adjust their requirements as needed to proceed.

### Reflection service

The BSR holds all of your Protobuf API definitions so it can easily act as a reflection server for
your Protobuf messages. This typically involves exposing a set of reflection endpoints on _your_
server, but this is no longer required because the BSR has all of your definitions and it can host
this functionality for you.

### BSR names - a fully qualified path

Today, Protobuf import paths are relative to user specified include directories. This may be the
single most painful lesson for new users to learn, so we want to get rid of it entirely. Imagine
importing `buf.build/googleapis/googleapis/google/api/http.proto` rather than
`google/api/http.proto`. The BSR will support this transition in a backwards-compatible manner so
you can opt into using a fully qualified import path if preferred.

### BSR API

Though largely accessible via the `buf` CLI, exposing the BSR API can enable the flexibility to use
your own tools and integrations with it.

## Ecosystem

### Better IDE integration

Buf currently supports both a [vim plugin](https://github.com/bufbuild/vim-buf) and a
[VSCode plugin](https://github.com/bufbuild/vscode-buf) to provide Protobuf linting in these
editors.

But we recognize that we can do a lot more in this area, such as formatting your Protobuf files on
save (via the formatter mentioned above), and a full-fledged _Protobuf language server_, which
involves implementing the [Language Server Protocol (LSP)](https://langserver.org).

With this, you will be able to use more editor features, such as auto-completion and
jump-to-definition, to further improve your Protobuf productivity.

### Protobuf standard library

You may already be familiar with Protobuf's
[Well-Known Types](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf),
but these largely act as thin wrappers around primitive values to support zeroable values, such as
the
[BoolValue](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#boolvalue).

These types are a good start, but we can do so much more with a true standard library of common API
definitions. Developers around the world are reinventing the wheel every time they need to define
their `PostalAddress`, `Currency`, and `URI` messages. Buf will address this by defining a generic
set of such types that can be dropped-in to your application so that you can focus on writing your
business logic.

### API versioning

We recognize that backwards-incompatible changes are inevitable. API authors should do everything
they can to prevent breaking changes from happening, but everyone makes mistakes and/or justifies
that the tradeoff is worth it (for whatever reason).

With that said, the team is exploring an API transcoding solution inspired by
[Stripe's API versioning](https://stripe.com/blog/api-versioning) strategy. In short, Stripe has
built infrastructure that lets them freely make breaking changes without ever breaking their
clients. An API transformation layer sits between their client and their server that translates old
API structures into their current API structures.

The BSR is perfectly positioned to bring this solution to Protobuf users. The BSR tracks the entire
history of your module, and can theoretically apply a series of changes (specified in a changelog)
to your API so that you can stop worrying about API compatibility entirely.

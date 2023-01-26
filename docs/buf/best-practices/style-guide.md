---
id: style-guide
title: Style guide
---

:::danger 🚧 Construction Notes

This EXPLANATION oriented to understanding must explain & build context. Its form, discursive explanation. Analogous an
article on culinary social history.

:::



This is our Style Guide for Protobuf.

This document is purposefully concise, and is meant as a short reference for
developers to refer to when writing Protobuf schemas.

The requirements follow the [`DEFAULT`](../lint/reference/rules#default) lint category.
For details on each rule and its rationale, see that documentation. Within this
Style Guide, we provide links under (Why?) where relevant for each check.

These recommendations are not enforced by the [BSR](../../bsr/explanation), but
are rather for reference.

This Style Guide is designed to provide consistency and maintainability across a
Protobuf schema of any size and any purpose, but without being so opinionated as
to restrict organizations from making the design decisions they need to make for
their individual APIs.

## Requirements

### Files and packages

All files should have a package defined.
[(Why?)](../lint/reference/rules#package_defined)

All files of the same package should be in the same directory. All files should
be in a directory that matches their package name.
[(Why?)](../lint/reference/rules#why)

For example, if we have a [module](../../bsr/explanation.mdx#modules) defined in the
`proto` directory, we expect these `package` values:

```sh
.
└── proto
    ├── buf.yaml
    └── foo
        └── bar
            ├── bat
            │   └── v1
            │       └── bat.proto // package foo.bar.bat.v1
            └── baz
                └── v1
                    ├── baz.proto         // package foo.bar.baz.v1
                    └── baz_service.proto // package foo.bar.baz.v1
```

Packages should be `lower_snake_case`.
[(Why?)](../lint/reference/rules#package_lower_snake_case)

The last component of a package should be a version.
[(Why?)](../lint/reference/rules#package_version_suffix)

Files should be named `lower_snake_case.proto`
[(Why?)](../lint/reference/rules#file_lower_snake_case)

All of the file options below should have the same value, or all be unset, for
all files that have the same package: [(Why?)](../lint/reference/rules#package_same_)

- `csharp_namespace`
- `go_package`
- `java_multiple_files`
- `java_package`
- `php_namespace`
- `ruby_package`
- `swift_prefix`

For example, if we have file `foo_one.proto`:

```protobuf title="foo_one.proto"
syntax = "proto3";

package foo.v1;

option go_package = "foov1";
option java_multiple_files = true;
option java_package = "com.foo.v1";
```

Another file `foo_two.proto` with package `foo.v1` must have these three options
set to the same value, and the other options unset:

```protobuf title="foo_two.proto"
syntax = "proto3";

package foo.v1;

option go_package = "foov1";
option java_multiple_files = true;
option java_package = "com.foo.v1";
```

### Imports

No imports should be declared as `public` or `weak`.
[(Why?)](../lint/reference/rules#import_no_weak)

### Enums

Enums should not have the `allow_alias` option set.
[(Why?)](../lint/reference/rules#enum_no_allow_alias)

Enum names should be `PascalCase`. [(Why?)](../lint/reference/rules#basic)

Enum value names should be `UPPER_SNAKE_CASE`. [(Why?)](../lint/reference/rules#basic)

Enum value names should be prefixed with the `UPPER_SNAKE_CASE` of the enum
name. [(Why?)](../lint/reference/rules#enum_value_prefix). For example, given the enum
`FooBar`, all enum value names should be prefixed with `FOO_BAR_`.

The zero value for all enums should be suffixed with `_UNSPECIFIED`.
[(Why?)](../lint/reference/rules#enum_zero_value_suffix) The suffix is configurable for
`buf` linting. For example, given the enum `FooBar`, the zero value should be
`FOO_BAR_UNSPECIFIED = 0;`.

### Messages

Message names should be `PascalCase`. [(Why?)](../lint/reference/rules#basic)

Field names should be `lower_snake_case`. [(Why?)](../lint/reference/rules#basic)

Oneof names should be `lower_snake_case`. [(Why?)](../lint/reference/rules#basic)

### Services

Service names should be `PascalCase`. [(Why?)](../lint/reference/rules#basic)

Service names should be suffixed with `Service`.
[(Why?)](../lint/reference/rules#service_suffix) The suffix is configurable for `buf`
linting.

RPC names should be `PascalCase`. [(Why?)](../lint/reference/rules#basic)

All RPC request and responses messages should be unique across your Protobuf
schema.
[(Why?)](../lint/reference/rules#rpc_request_standard_name-rpc_response_standard_name-rpc_request_response_unique)

All RPC request and response messages should be named after the RPC, either by
naming them `MethodNameRequest`, `MethodNameResponse` or
`ServiceNameMethodNameRequest`, `ServiceNameMethodNameResponse`.
[(Why?)](../lint/reference/rules#rpc_request_standard_name-rpc_response_standard_name-rpc_request_response_unique)

## Recommendations

While not strictly related to style, you should always set up breaking change
detection for your Protobuf schema. See the
[breaking change detector documentation](../breaking/explanation.md) for more
details on how to enforce this with `buf`.

Use `//` instead of `/* */` for comments.

Over-document, and use complete sentences for comments. Put documentation above
the type, instead of inline.

Avoid widely used keywords for all types, especially packages. For example, if
your package name is `foo.internal.bar`, the `internal` component blocks
importing the generated stubs in other packages for Golang.

Files should be laid out in this order (this matches
[Google's current recommendations](https://developers.google.com/protocol-buffers/docs/style#file-structure)):

- License header (if applicable)
- File overview
- Syntax
- Package
- Imports (sorted)
- File options
- Everything else

Used pluralized names for repeated fields.

Name fields after their type as much as possible. For example, for a field of
message type `FooBar`, name the field `foo_bar` unless there is a specific
reason to do otherwise.

Avoid using nested enums and nested messages. You may end up wanting to use them
outside their context message in the future, even if you do not think so at
the moment.

While controversial, our recommendation is to avoid streaming RPCs. While they
certainly have specific use cases that make them extremely valuable, on the
whole they generally cause a lot of problems, push RPC framework logic up the
stack, and usually prevent developing more reliable architectures.

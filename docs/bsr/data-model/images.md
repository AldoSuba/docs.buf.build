---
id: images
title: Images
---


:::danger 🚧 Construction Notes

This EXPLANATION oriented to understanding must explain & build context. Its form, discursive explanation. Analogous an
article on culinary social history.

:::

import Image from "@site/src/components/Image";
import Syntax from "@site/src/components/Syntax";


Throughout the documentation, you may occasionally see references to Buf
**images**. We'll go over what images are, how they are used, and the various
options associated with them here.

## How Protobuf plugins work {#plugins}

First we need to provide a short overview of how Protobuf plugins work.

When you invoke this command...

```sh
$ protoc -I . --go_out=gen/go foo.proto
```

...here's (roughly) what happens:

- `protoc` compiles the file `foo.proto` (and any imports) and internally
  produces a [`FileDescriptorSet`][filedescriptorset], which is a list of
  [`FileDescriptorProto`][filedescriptorproto] messages. These messages contain
  all information about your `.proto` files, including optional source code
  information such as the start/end line/column of each element of your `.proto`
  file, as well as associated comments.
- The `FileDescriptorSet` is turned into a
  [`CodeGeneratorRequest`][codegeneratorrequest], which contains the
  `FileDescriptorProto`s that `protoc` produced for `foo.proto` and any imports,
  a list of the files specified (just `foo.proto` in this example), as well as
  any options provided after the `=` sign of `--go_out` or with `--go_opt`.
- `protoc` then looks for a binary named `protoc-gen-go`, and invokes it, giving
  the serialized CodeGeneratorRequest as stdin.
- `protoc-gen-go` runs, and either errors or produces a
  [`CodeGeneratorResponse`][codegeneratorresponse], which specifies what files
  are to be generated and their content. The serialized CodeGeneratorResponse is
  written to stdout of `protoc-gen-go`.
- On success of `protoc-gen-go`, `protoc` reads stdout and then writes these
  generated files.

The built-in generators to `protoc`, such as `--java_out`, `--cpp_out`, etc.,
work in roughly the same manner, although instead of executing an external
binary, this is done internally to `protoc`.

**`FileDescriptorSet`s are the core primitive used throughout the Protobuf
ecosystem to represent a compiled Protobuf schema. They are also the primary
artifact that protoc produces.**

That is to say that everything you do with `protoc`, and any plugins you use,
talk in terms of `FileDescriptorSet`s.
[gRPC Reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md)
uses them under the hood as well.

## Creating `FileDescriptorSet`s with protoc

`protoc` provides the `--descriptor_set_out` flag, aliased as `-o`, to allow
writing serialized `FileDescriptorSet`s. For example, given a single file
`foo.proto`, you can write a `FileDescriptorSet` to stdout like this:

```sh
$ protoc -I . -o /dev/stdout foo.proto
```

The resulting `FileDescriptorSet` contains a single `FileDescriptorProto` with
name `foo.proto`.

By default, `FileDescriptorSet`s don't include any imports not specified on the
command line, and don't include source code information. Source code information
is useful for generating documentation inside your generated stubs, and for
things like linters and breaking change detectors. As an example, assume
`foo.proto` imports `bar.proto`. To produce a `FileDescriptorSet` that includes
both `foo.proto` and `bar.proto`, as well as source code information:

```sh
$ protoc -I . --include_imports --include_source_info -o /dev/stdout foo.proto
```

## What are Buf images?

An **image** is Buf's custom extension to `FileDescriptorSet`s. The actual
definition is currently stored in the
[bufbuild/buf](https://github.com/bufbuild/buf/blob/master/proto/buf/alpha/image/v1/image.proto)
repo as of this writing.

**Buf images are `FileDescriptorSet`s, and `FileDescriptorSet`s are images.**
Due to the forwards- and backwards-compatible nature of Protobuf, we add another
field to `FileDescriptorSet` while maintaining compatibility in both
directions - existing Protobuf plugins drop this field, and `buf` does not
require this field to be set to work with images.

**[Modules](../explanation#modules) are the primitive of Buf, and Buf
images represent the compiled artifact of a module.** In fact, images contain
information about the module used to create it, which powers a variety of
[BSR](../explanation) features. For clarity, the [`Image`][image-proto]
Protobuf definition is shown below (notice the `ModuleName` in the
`ImageFileExtension`):

```protobuf
// A Buf image is an extended FileDescriptorSet.
//
// See https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
message Image {
  repeated ImageFile file = 1;
}

// ImageFile is an extended FileDescriptorProto.
//
// Since FileDescriptorProto does not have extensions, we copy the fields from
// FileDescriptorProto, and then add our own extensions via the
// buf_image_file_extension field. This is compatible with a
// FileDescriptorProto.
//
// See https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
message ImageFile {
  optional string name = 1;
  optional string package = 2;
  repeated string dependency = 3;
  repeated int32 public_dependency = 10;
  repeated int32 weak_dependency = 11;
  repeated google.protobuf.DescriptorProto message_type = 4;
  repeated google.protobuf.EnumDescriptorProto enum_type = 5;
  repeated google.protobuf.ServiceDescriptorProto service = 6;
  repeated google.protobuf.FieldDescriptorProto extension = 7;
  optional google.protobuf.FileOptions options = 8;
  optional google.protobuf.SourceCodeInfo source_code_info = 9;
  optional string syntax = 12;

  // buf_extension contains buf-specific extensions to FileDescriptorProtos.
  //
  // The prefixed name and high tag value is used to all but guarantee there
  // is never a conflict with Google's FileDescriptorProto definition.
  // The definition of a FileDescriptorProto has not changed in years, so
  // we're not too worried about a conflict here.
  optional ImageFileExtension buf_extension = 8042;
}

// ImageFileExtension contains extensions to ImageFiles.
//
// The fields are not included directly on the ImageFile so that we can both
// detect if extensions exist, which signifies this was created by buf and not
// by protoc, and so that we can add fields in a freeform manner without
// worrying about conflicts with FileDescriptorProto.
message ImageFileExtension {
  // is_import denotes whether this file is considered an "import".
  //
  // An import is a file which was not derived from the local source files.
  // There are two cases where this could be true:
  //
  // 1. A Well-Known Type included from the compiler.
  // 2. A file that was included from a Buf module dependency.
  //
  // We use "import" as this matches with the protoc concept of
  // --include_imports, however import is a bit of an overloaded term.
  //
  // This is always set.
  optional bool is_import = 1;
  // ModuleInfo contains information about the Buf module this file belongs to.
  //
  // This field is optional and is not set if the module is not known.
  optional ModuleInfo module_info = 2;
  // is_syntax_unspecified denotes whether the file did not have a syntax
  // explicitly specified.
  //
  // Per the FileDescriptorProto spec, it would be fine in this case to just
  // leave the syntax field unset to denote this and to set the syntax field
  // to "proto2" if it is specified. But protoc does not set the syntax
  // field if it was "proto2", and plugins may (incorrectly) depend on this.
  // We also want to maintain consistency with protoc as much as possible.
  // So instead, we have this field which denotes whether syntax was not
  // specified.
  //
  // This is always be set.
  optional bool is_syntax_unspecified = 3;
  // unused_dependency are the indexes within the dependency field on
  // FileDescriptorProto for those dependencies that are not used.
  //
  // This matches the shape of the public_dependency and weak_dependency
  // fields.
  repeated int32 unused_dependency = 4;
}

// ModuleInfo contains information about a Buf module that an ImageFile
// belongs to.
message ModuleInfo {
  // name is the name of the Buf module.
  //
  // This is always set.
  optional ModuleName name = 1;
  // commit is the repository commit.
  //
  // This field is optional and not set if the commit is not known.
  optional string commit = 2;
}

// ModuleName is a module name.
//
// All fields are always set.
message ModuleName {
  optional string remote = 1;
  optional string owner = 2;
  optional string repository = 3;
}
```

## Linting and breaking change detection

Linting and breaking change detection internally operate on Buf images that the
`buf` CLI either produces on the fly or reads from an external location. They
represent a stable, widely used method to represent a compiled Protobuf schema.
For the breaking change detector, images are the storage format used if you want
to manually store the state of your Protobuf schema. See the
[input documentation](../../buf/other/inputs.md#breaking-change-detection) for more details.

## Creating images

You can create Buf images using `buf build`. If the current directory contains a
valid [`buf.yaml`](../../configuration/v1/buf-yaml.md), you can build an image
with this command:

```sh
$ buf build -o image.bin
```

The resulting Buf image is written to the `image.bin` file. Of note, the
ordering of the `FileDescriptorProto`s is carefully written to mimic the
ordering that `protoc` would produce, for both the cases where imports are and
are not written.

By default, `buf` produces a [Buf image](images.md) with both
imports and source code info. You can strip each of these:

```sh
$ buf build --exclude-imports --exclude-source-info -o image.bin
```

In general, we do not recommend stripping these, as this information can be
useful for various operations. Source code info, however, takes up a lot of
additional space (generally ~5x more space), so if you know you do not need this
data, it can be useful to strip source code info.

Images can be outputted in one of two formats:

- Binary
- JSON

Either format can be compressed using Gzip or Zstandard.

Per the [Buf input](../../buf/other/inputs.md) documentation, `buf build` can deduce the format
from the file extension:

```sh
$ buf build -o image.bin
$ buf build -o image.bin.gz
$ buf build -o image.bin.zst
$ buf build -o image.json
$ buf build -o image.json.gz
$ buf build -o image.json.zst
```

The special value `-` is used to denote stdout. You can manually set the format.
For example:

```terminal
$ buf build -o -#format=json
```

You can combine this with [jq](https://stedolan.github.io/jq) to introspect the
built image. To see a list of all packages:

```terminal
$ buf build -o -#format=json | jq '.file[] | .package' | sort | uniq | head
---
"google.actions.type"
"google.ads.admob.v1"
"google.ads.googleads.v1.common"
"google.ads.googleads.v1.enums"
"google.ads.googleads.v1.errors"
"google.ads.googleads.v1.resources"
"google.ads.googleads.v1.services"
"google.ads.googleads.v2.common"
"google.ads.googleads.v2.enums"
"google.ads.googleads.v2.errors"
```

Images always include the `ImageFileExtension` field. If you want a pure
`FileDescriptorSet` without this field set, to mimic `protoc` entirely:

```terminal
$ buf build -o image.bin --as-file-descriptor-set
```

The `ImageFileExtension` field doesn't affect Protobuf plugins or any other
operations; they merely see this as an unknown field. But we provide this option
in case you need it.

## Using protoc output as `buf` input

Since `buf` speaks in terms of [Buf images](images.md) and
[`FileDescriptorSet`][filescriptorset]s are images, we can use`protoc` output as
`buf` input. Here's an example for [`buf lint`](../../buf/lint/how-to.mdx):

```terminal
$ protoc -I . --include_source_info -o /dev/stdout foo.proto | buf lint -
```

## Protoc lint and breaking change detection plugins

Since `buf` "understands" [`FileDescriptorSet`][filedescriptorset]s, we can
provide plugins [`protoc-gen-buf-lint`](../../buf/other/protoc-plugins.md#lint) and
[`protoc-gen-buf-breaking`](../../buf/other/protoc-plugins.md#breaking) as standard
Protobuf plugins as well.

[codegeneratorrequest]: https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/compiler/plugin.proto#L68
[codegeneratorresponse]: https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/compiler/plugin.proto#L99
[filedescriptorproto]: https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto#L62
[filedescriptorset]: https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
[image-proto]: https://buf.build/bufbuild/buf/docs/main/buf.alpha.image.v1#buf.alpha.image.v1.Image
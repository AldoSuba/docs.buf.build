---
id: overview
title: Overview
---

One of the core promises of Protobuf is forwards and backwards compatibility.
But making sure that your Protobuf schema doesn't introduce breaking changes
isn't automatic - there are rules you need to follow to ensure that your schema
remains compatible for its lifetime.

`buf` provides a breaking change detector through `buf breaking`, which runs a
set of [breaking rules](rules.md) across the current version of your entire
Protobuf schema in comparison to a past version of your Protobuf schema. The
rules are selectable, and split up into logical categories depending on the
nature of breaking changes you care about:

- `FILE`: Breaking generated source code on a per-file basis.

- `PACKAGE`: Breaking generated source code changes on a per-package basis.

- `WIRE_JSON`: Breaking wire (binary) or JSON encoding.

- `WIRE`: Breaking wire (binary) encoding.

`FILE` is the strictest, most breakage-detecting category and is the default
for `buf breaking`. [Rules and categories](rules.md) covers these categories in
more detail.

Other features of `buf`'s breaking change detector include:

- **Selectable configuration** of the exact breaking rules you want, including
  categorization of breaking rules into logical categories. While we recommend
  using the `FILE` set of breaking rules, `buf` enables you to select the exact
  set of rules your organization needs.

- **File references**. `buf`'s breaking change detector produces file references
  to the location of the breaking change, including if a reference moves across
  files between your past and current file versions. For example, if a field
  changes type, `buf` produces a reference to the field. If a field is deleted,
  `buf` produces a reference to the location of the message in the current file.

- **Speed**. `buf`'s
  [internal Protobuf compiler](../reference/internal-compiler.md) utilizes all
  available cores to compile your Protobuf schema, while still maintaining
  deterministic output. Additionally files are copied into memory before
  processing. As an unscientific example, `buf` can compile all 2,311 `.proto`
  files in [googleapis](https://github.com/googleapis/googleapis) in about
  _0.8s_ on a four-core machine, as opposed to about 4.3s for `protoc` on the
  same machine. While both are fast, this provides instantaneous feedback, which
  is especially useful with Editor integration. `buf`'s speed is directly
  proportional to the input size, so linting a single file only takes a few
  milliseconds.

---
id: buf
title: buf
sidebar_position: -68
---
version 1.11.1-dev

The Buf CLI

### Synopsis

The Buf CLI

A tool for working with Protocol Buffers and managing resources on the Buf Schema Registry (BSR).

```
buf [flags]
```

### Options

```
      --debug               Turn on debug logging.
  -h, --help                help for buf
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
      --version             Print the version.
```

### Subcommands

* [buf beta](buf-beta.md)	 - Beta commands. Unstable and likely to change.
* [buf breaking](buf-breaking.md)	 - Verify that the input location has no breaking changes compared to the against location.
* [buf build](buf-build.md)	 - Build all Protobuf files from the specified input and output a Buf image.
* [buf convert](buf-convert.md)	 - Convert a message from binary to JSON or vice versa
* [buf export](buf-export.md)	 - Export the files from the input location to an output location.
* [buf format](buf-format.md)	 - Format all Protobuf files from the specified input and output the result.
* [buf generate](buf-generate.md)	 - Generate stubs for protoc plugins using a template.
* [buf lint](buf-lint.md)	 - Verify that the input location passes lint checks.
* [buf ls-files](buf-ls-files.md)	 - List all Protobuf files for the input.
* [buf mod](buf-mod.md)	 - Manage Buf modules.
* [buf push](buf-push.md)	 - Push a module to a registry.
* [buf registry](buf-registry.md)	 - Manage assets on the Buf Schema Registry.


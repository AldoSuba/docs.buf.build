---
id: buf-ls-files
title: buf ls files
sidebar_position: -55
---
List all Protobuf files for the input.

### Synopsis

List all Protobuf files for the input.

The first argument is the source, module, or image to list from.
The first argument must be one of format [bin,dir,git,json,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.

```
buf ls-files <input> [flags]
```

### Options

```
      --as-import-paths       Strip local directory paths and print filepaths as they are imported.
      --config string         The file or data to use for configuration.
      --disable-symlinks      Do not follow symlinks when reading sources or configuration from the local filesystem.
                              By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry.
      --error-format string   The format for build errors printed to stderr. Must be one of [text,json,msvs,junit]. (default "text")
  -h, --help                  help for ls-files
      --include-imports       Include imports.
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf](buf.md)	 - The Buf CLI

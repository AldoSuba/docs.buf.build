---
id: lint
title: buf lint
sidebar_label: lint
sidebar_position: 10
---
Verify that the input location passes lint checks.

### Synopsis

Verify that the input location passes lint checks.

The first argument is the source, module, or Image to lint.
The first argument must be one of format [bin,dir,git,json,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;. 

```
buf lint <input> [flags]
```

### Flags

```
      --config string          The file or data to use for configuration.
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem.
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry.
      --error-format string    The format for build errors or check violations printed to stdout. Must be one of [text,json,msvs,junit,config-ignore-yaml]. (default "text")
      --exclude-path strings   Exclude specific files or directories, for example "proto/a/a.proto" or "proto/a".
                               If specified multiple times, the union is taken.
  -h, --help                   help for lint
      --path strings           Limit to specific files or directories, for example "proto/a/a.proto" or "proto/a".
                               If specified multiple times, the union is taken.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf](index)	 - The Buf CLI

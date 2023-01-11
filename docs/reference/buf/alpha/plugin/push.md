---
id: push
title: buf alpha plugin push
sidebar_label: push
sidebar_position: 1
---
Push a plugin to a registry.

### Synopsis

Push a plugin to a registry.

The first argument is the source to push (directory containing buf.plugin.yaml or plugin release zip).
The first argument must be one of format [dir,git,tar,zip].
If no argument is specified, defaults to &#34;.&#34;. 

```
buf alpha plugin push <source> [flags]
```

### Flags

```
      --disable-symlinks         Do not follow symlinks when reading sources or configuration from the local filesystem.
                                 By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry.
      --error-format string      The format for build errors printed to stderr. Must be one of [text,json,msvs,junit]. (default "text")
      --format string            The output format to use. Must be one of [text,json] (default "text")
  -h, --help                     help for push
      --image string             Existing image to push.
      --override-remote string   Override the default remote found in buf.plugin.yaml name and dependencies.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf alpha plugin](index)	 - Manage plugins on the Buf Schema Registry.

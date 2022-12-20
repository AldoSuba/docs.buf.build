---
id: buf-mod-prune
title: buf mod prune
sidebar_position: -61
---
Prunes unused dependencies from the buf.lock file.

### Synopsis

Prunes unused dependencies from the buf.lock file.

The first argument is the directory of the local module to prune. Defaults to &#34;.&#34; if no argument is specified.

```
buf mod prune <directory> [flags]
```

### Options

```
  -h, --help   help for prune
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf mod](buf-mod.md)	 - Manage Buf modules.

---
id: prune
title: buf mod prune
sidebar_label: prune
sidebar_position: 6
---
Prunes unused dependencies from the buf.lock file.

### Synopsis

Prunes unused dependencies from the buf.lock file.

The first argument is the directory of the local module to prune. Defaults to &#34;.&#34; if no argument is specified. 

```
buf mod prune <directory> [flags]
```

### Flags

```
  -h, --help   help for prune
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf mod](index)	 - Manage Buf modules.

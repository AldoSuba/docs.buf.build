---
id: buf-beta-registry-plugin-deprecate
title: buf beta registry plugin deprecate
sidebar_position: -15
---
Deprecate a plugin by name.

```
buf beta registry plugin deprecate <buf.build/owner/plugins/plugin> [flags]
```

### Options

```
  -h, --help             help for deprecate
      --message string   The message to display with deprecation warnings.
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry plugin](buf-beta-registry-plugin.md)	 - Manage Protobuf plugins.

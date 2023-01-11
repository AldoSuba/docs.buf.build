---
id: deprecate
title: buf beta registry template deprecate
sidebar_label: deprecate
sidebar_position: 3
---
Deprecate a template by name.

```
buf beta registry template deprecate <buf.build/owner/templates/template> [flags]
```

### Flags

```
  -h, --help             help for deprecate
      --message string   The message to display with deprecation warnings.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry template](index)	 - Manage Protobuf templates on the Buf Schema Registry.

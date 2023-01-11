---
id: ls-breaking-rules
title: buf mod ls-breaking-rules
sidebar_label: ls-breaking-rules
sidebar_position: 3
---
List breaking rules.

```
buf mod ls-breaking-rules [flags]
```

### Flags

```
      --all              List all rules and not just those currently configured.
      --config string    The file or data to use for configuration. Ignored if --all or --version is specified.
      --format string    The format to print rules as. Must be one of [text,json]. (default "text")
  -h, --help             help for ls-breaking-rules
      --version string   List all the rules for the given configuration version. Implies --all. Must be one of [v1beta1,v1].
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

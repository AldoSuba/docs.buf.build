---
id: buf-mod-ls-lint-rules
title: buf mod ls lint rules
sidebar_position: -59
---
List lint rules.

```
buf mod ls-lint-rules [flags]
```

### Options

```
      --all              List all rules and not just those currently configured.
      --config string    The file or data to use for configuration. Ignored if --all or --version is specified.
      --format string    The format to print rules as. Must be one of [text,json]. (default "text")
  -h, --help             help for ls-lint-rules
      --version string   List all the rules for the given configuration version. Implies --all. Must be one of [v1beta1,v1].
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

---
id: index
title: buf mod
sidebar_label: overview
sidebar_position: 0
---
Manage Buf modules.

```
buf mod [flags]
```

### Flags

```
  -h, --help   help for mod
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf mod clear-cache](clear-cache)	 - Clears the Buf module cache.
* [buf mod init](init)	 - Initializes and writes a new buf.yaml configuration file.
* [buf mod ls-breaking-rules](ls-breaking-rules)	 - List breaking rules.
* [buf mod ls-lint-rules](ls-lint-rules)	 - List lint rules.
* [buf mod open](open)	 - Open the module's homepage in a web browser.
* [buf mod prune](prune)	 - Prunes unused dependencies from the buf.lock file.
* [buf mod update](update)	 - Update a module's dependencies by updating the buf.lock file.

### Parent Command

* [buf](../index)	 - The Buf CLI

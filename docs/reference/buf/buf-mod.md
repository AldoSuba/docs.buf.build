---
id: buf-mod
title: buf mod
sidebar_position: -63
---
Manage Buf modules.

```
buf mod [flags]
```

### Options

```
  -h, --help   help for mod
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf mod clear-cache](buf-mod-clear-cache.md)	 - Clears the Buf module cache.
* [buf mod init](buf-mod-init.md)	 - Initializes and writes a new buf.yaml configuration file.
* [buf mod ls-breaking-rules](buf-mod-ls-breaking-rules.md)	 - List breaking rules.
* [buf mod ls-lint-rules](buf-mod-ls-lint-rules.md)	 - List lint rules.
* [buf mod open](buf-mod-open.md)	 - Open the module's homepage in a web browser.
* [buf mod prune](buf-mod-prune.md)	 - Prunes unused dependencies from the buf.lock file.
* [buf mod update](buf-mod-update.md)	 - Update a module's dependencies by updating the buf.lock file.

### Parent Command

* [buf](buf.md)	 - The Buf CLI

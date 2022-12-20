---
id: buf-beta-registry-repository-create
title: buf beta registry repository create
sidebar_position: -21
---
Create a new repository on the BSR.

```
buf beta registry repository create <buf.build/owner/repository> [flags]
```

### Options

```
      --format string       The output format to use. Must be one of [text,json]. (default "text")
  -h, --help                help for create
      --visibility string   The repository's visibility setting. Must be one of [public,private].
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry repository](buf-beta-registry-repository.md)	 - Manage repositories.

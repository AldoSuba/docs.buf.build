---
id: buf-beta-registry-repository-update
title: buf beta registry repository update
sidebar_position: -27
---
Update a BSR repository settings.

```
buf beta registry repository update <buf.build/owner/repository> [flags]
```

### Options

```
  -h, --help                help for update
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

---
id: create
title: buf beta registry tag create
sidebar_label: create
sidebar_position: 1
---
Create a tag for the specified commit.

```
buf beta registry tag create <buf.build/owner/repository:commit> <tag> [flags]
```

### Flags

```
      --format string   The output format to use. Must be one of [text,json]. (default "text")
  -h, --help            help for create
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry tag](index)	 - Manage a repository's tags.

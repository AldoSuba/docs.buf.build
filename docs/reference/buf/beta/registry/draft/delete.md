---
id: delete
title: buf beta registry draft delete
sidebar_label: delete
sidebar_position: 1
---
Delete a draft of a BSR repository by name.

```
buf beta registry draft delete <buf.build/owner/repo:draft> [flags]
```

### Flags

```
      --force   Force deletion without confirming. Use with caution.
  -h, --help    help for delete
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry draft](index)	 - Manage a repository's drafts.

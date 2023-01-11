---
id: delete
title: buf beta registry webhook delete
sidebar_label: delete
sidebar_position: 2
---
Delete a repository webhook.

```
buf beta registry webhook delete [flags]
```

### Flags

```
  -h, --help            help for delete
      --id string       The webhook ID to delete.
      --remote string   The remote of the repository the webhook ID belongs to.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta registry webhook](index)	 - Manage webhooks for a repository on the Buf Schema Registry.

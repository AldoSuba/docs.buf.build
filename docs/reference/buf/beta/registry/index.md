---
id: index
title: buf beta registry
sidebar_label: overview
sidebar_position: 0
---
Manage assets on the Buf Schema Registry.

```
buf beta registry [flags]
```

### Flags

```
  -h, --help   help for registry
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta registry commit](commit/index)	 - Manage a repository's commits.
* [buf beta registry draft](draft/index)	 - Manage a repository's drafts.
* [buf beta registry organization](organization/index)	 - Manage organizations.
* [buf beta registry plugin](plugin/index)	 - Manage Protobuf plugins.
* [buf beta registry repository](repository/index)	 - Manage repositories.
* [buf beta registry tag](tag/index)	 - Manage a repository's tags.
* [buf beta registry template](template/index)	 - Manage Protobuf templates on the Buf Schema Registry.
* [buf beta registry webhook](webhook/index)	 - Manage webhooks for a repository on the Buf Schema Registry.

### Parent Command

* [buf beta](../index)	 - Beta commands. Unstable and likely to change.

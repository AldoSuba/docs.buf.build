---
id: index
title: buf beta registry template
sidebar_label: overview
sidebar_position: 7
---
Manage Protobuf templates on the Buf Schema Registry.

```
buf beta registry template [flags]
```

### Flags

```
  -h, --help   help for template
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta registry template create](create)	 - Create a new Buf template.
* [buf beta registry template delete](delete)	 - Delete a template by name.
* [buf beta registry template deprecate](deprecate)	 - Deprecate a template by name.
* [buf beta registry template list](list)	 - List templates on the specified remote.
* [buf beta registry template undeprecate](undeprecate)	 - Undeprecate a template by name.
* [buf beta registry template version](version/index)	 - Manage Protobuf template versions.

### Parent Command

* [buf beta registry](../index)	 - Manage assets on the Buf Schema Registry.

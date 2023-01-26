---
id: index
title: buf beta registry plugin
sidebar_label: overview
sidebar_position: 0
---
Manage Protobuf plugins.

```
buf beta registry plugin [flags]
```

### Flags

```
  -h, --help   help for plugin
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta registry plugin create](create)	 - Create a new Protobuf plugin.
* [buf beta registry plugin delete](delete)	 - Delete a Protobuf plugin by name.
* [buf beta registry plugin deprecate](deprecate)	 - Deprecate a plugin by name.
* [buf beta registry plugin list](list)	 - List plugins on the specified remote.
* [buf beta registry plugin undeprecate](undeprecate)	 - Undeprecate a plugin by name.
* [buf beta registry plugin version](version/index)	 - Manage Protobuf plugin versions.

### Parent Command

* [buf beta registry](../index)	 - Manage assets on the Buf Schema Registry.

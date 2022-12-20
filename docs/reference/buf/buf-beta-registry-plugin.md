---
id: buf-beta-registry-plugin
title: buf beta registry plugin
sidebar_position: -20
---
Manage Protobuf plugins.

```
buf beta registry plugin [flags]
```

### Options

```
  -h, --help   help for plugin
```

### Options inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta registry plugin create](buf-beta-registry-plugin-create.md)	 - Create a new Protobuf plugin.
* [buf beta registry plugin delete](buf-beta-registry-plugin-delete.md)	 - Delete a Protobuf plugin by name.
* [buf beta registry plugin deprecate](buf-beta-registry-plugin-deprecate.md)	 - Deprecate a plugin by name.
* [buf beta registry plugin list](buf-beta-registry-plugin-list.md)	 - List plugins on the specified remote.
* [buf beta registry plugin undeprecate](buf-beta-registry-plugin-undeprecate.md)	 - Undeprecate a plugin by name.
* [buf beta registry plugin version](buf-beta-registry-plugin-version.md)	 - Manage Protobuf plugin versions.

### Parent Command

* [buf beta registry](buf-beta-registry.md)	 - Manage assets on the Buf Schema Registry.

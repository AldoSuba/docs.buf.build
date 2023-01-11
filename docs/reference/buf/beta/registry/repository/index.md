---
id: index
title: buf beta registry repository
sidebar_label: overview
sidebar_position: 5
---
Manage repositories.

```
buf beta registry repository [flags]
```

### Flags

```
  -h, --help   help for repository
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta registry repository create](create)	 - Create a new repository on the BSR.
* [buf beta registry repository delete](delete)	 - Delete a BSR repository by name.
* [buf beta registry repository deprecate](deprecate)	 - Deprecate a repository on the BSR.
* [buf beta registry repository get](get)	 - Get a BSR repository by name.
* [buf beta registry repository list](list)	 - List BSR repositories.
* [buf beta registry repository undeprecate](undeprecate)	 - Undeprecate a BSR repository.
* [buf beta registry repository update](update)	 - Update a BSR repository settings.

### Parent Command

* [buf beta registry](../index)	 - Manage assets on the Buf Schema Registry.

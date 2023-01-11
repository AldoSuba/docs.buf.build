---
id: index
title: buf beta
sidebar_label: overview
sidebar_position: 0
---
Beta commands. Unstable and likely to change.

```
buf beta [flags]
```

### Flags

```
  -h, --help   help for beta
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Subcommands

* [buf beta convert](convert)	 - Convert a message from binary to JSON or vice versa
* [buf beta migrate-v1beta1](migrate-v1beta1)	 - Migrate any v1beta1 configuration files in the directory to the latest version.
* [buf beta registry](registry/index)	 - Manage assets on the Buf Schema Registry.
* [buf beta studio-agent](studio-agent)	 - Run an HTTP(S) server as the Studio agent.

### Parent Command

* [buf](../index)	 - The Buf CLI

---
id: export
title: buf export
sidebar_label: export
sidebar_position: 7
---
Export the files from the input location to an output location.

### Synopsis

Export the files from the input location to an output location.

The first argument is the source or module to export.
The first argument must be one of format [bin,dir,git,json,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.

Examples:

	$ buf export &lt;input&gt; --output=&lt;output-dir&gt;

input can be of the format [dir,git,mod,protofile,tar,targz,zip].

output will be a directory with all of the .proto files in the &lt;input&gt;.

Export current directory to another local directory. 

	$ buf export . --output=&lt;output-dir&gt;

Export the latest remote module to a local directory.

	$ buf export buf.build/&lt;owner&gt;/&lt;repo&gt; --output=&lt;output-dir&gt;

Export a specific version of a remote module to a local directory.

	$ buf export buf.build/&lt;owner&gt;/&lt;repo&gt;:&lt;version&gt; --output=&lt;output-dir&gt;

Export a git repo to a local directory.

	$ buf export https://&lt;git-server&gt;/&lt;owner&gt;/&lt;repo&gt;.git --output=&lt;output-dir&gt; 

```
buf export <input> [flags]
```

### Flags

```
      --config string          The file or data to use for configuration.
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem.
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry.
      --exclude-imports        Exclude imports.
      --exclude-path strings   Exclude specific files or directories, for example "proto/a/a.proto" or "proto/a".
                               If specified multiple times, the union is taken.
  -h, --help                   help for export
  -o, --output string          The output directory for exported files.
      --path strings           Limit to specific files or directories, for example "proto/a/a.proto" or "proto/a".
                               If specified multiple times, the union is taken.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log-format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf](index)	 - The Buf CLI

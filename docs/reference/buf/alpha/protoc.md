---
id: protoc
title: buf alpha protoc
sidebar_label: protoc
sidebar_position: 2
---
version 3.21.7-buf

High-performance protoc replacement.

### Synopsis

High-performance protoc replacement.

This command replaces protoc using Buf&#39;s internal compiler.

The implementation is in progress. Although it outperforms mainline protoc,
it hasn&#39;t yet been optimized.

This protoc replacement is currently stable but should be considered a preview.

Additional flags:

      --(.*)_out:                   Run the named plugin.
      --(.*)_opt:                   Options for the named plugin.
      @filename:                    Parse arguments from the given filename. 

```
buf alpha protoc <proto_file1> <proto_file2> ... [flags]
```

### Flags

```
      --by_dir                      Execute parallel plugin calls for every directory containing .proto files.
  -o, --descriptor_set_out string   The location to write the FileDescriptorSet. Must be one of format [bin,json].
      --error_format string         The error format to use. Must be one of format [text,gcc,json,msvs,junit].
  -h, --help                        help for protoc
      --include_imports             Include imports in the resulting FileDescriptorSet.
      --include_source_info         Include source info in the resulting FileDescriptorSet.
      --plugin strings              The paths to the plugin executables to use, either in the form "path/to/protoc-gen-foo" or "protoc-gen-foo=path/to/binary".
      --print_free_field_numbers    Print the free field numbers of all messages.
  -I, --proto_path strings          The directory paths to include.
      --version                     Print the version.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf alpha](index)	 - Alpha commands. Unstable and recommended only for experimentation. These may be deleted.

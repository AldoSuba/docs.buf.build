---
id: convert
title: buf beta convert
sidebar_label: convert
sidebar_position: 1
---
Convert a message from binary to JSON or vice versa

### Synopsis

Convert a message from binary to JSON or vice versa

Use an input proto to interpret a proto/json message and convert it to a different format.

The simplest form is:

$ buf convert &lt;input&gt; --type=&lt;type&gt; --from=&lt;payload&gt; --to=&lt;output&gt;

&lt;input&gt; is the same input as any other buf command. 
It can be a local .proto file, binary output of &#34;buf build&#34;, bsr module or local buf module.
e.g.
$ buf convert example.proto --type=Foo.proto --from=payload.json --to=output.bin

# Other examples

# All of &lt;input&gt;, &#34;--from&#34; and &#34;to&#34; accept formatting options

$ buf convert example.proto#format=bin --type=buf.Foo --from=payload#format=json --to=out#format=json

# Both &lt;input&gt; and &#34;--from&#34; accept stdin redirecting

$ buf convert &lt;(buf build -o -)#format=bin --type=foo.Bar --from=&lt;(echo &#34;{\&#34;one\&#34;:\&#34;55\&#34;}&#34;)#format=json

# Redirect from stdin to --from

$ echo &#34;{\&#34;one\&#34;:\&#34;55\&#34;}&#34; | buf convert buf.proto --type buf.Foo --from -#format=json

# Redirect from stdin to &lt;input&gt;

$ buf build -o - | buf convert -#format=bin --type buf.Foo --from=payload.json

# Use a module on the bsr

buf convert buf.build/&lt;org&gt;/&lt;repo&gt; --type buf.Foo --from=payload.json 

```
buf beta convert <input> [flags]
```

### Flags

```
      --error-format string   The format for build errors printed to stderr. Must be one of [text,json,msvs,junit]. (default "text")
      --from string           The location of the payload to be converted. Supported formats are [bin,json]. (default "-")
  -h, --help                  help for convert
      --to string             The output location of the conversion. Supported formats are [bin,json]. (default "-")
      --type string           The full type name of the message within the input (e.g. acme.weather.v1.Units)
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging.
      --log_format string   The log format [text,color,json]. (default "color")
      --timeout duration    The duration until timing out. (default 2m0s)
  -v, --verbose             Turn on verbose mode.
```

### Parent Command

* [buf beta](index)	 - Beta commands. Unstable and likely to change.

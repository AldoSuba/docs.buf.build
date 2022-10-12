---
id: remote-plugin-execution
title: Remote plugin execution
---

One of the greatest challenges with Protobuf code generation is the complexity of working with `protoc` and custom
plugins. Time and time again we've heard that developers want the benefits of code generation, but the existing tooling
gets in the way.

There is a high barrier to entry due to the complex web of different compiler and plugin versions. Managing and
maintaining a stable environment locally on a single machine is hard enough, and the problem is compounded as you scale
out code generation across many developers.

Every organization and open source project develops homegrown tooling in an effort to simplify the developer experience
and maintain consistent output across developers. A handful of organizations might get a workable solution, but these
remain brittle and difficult to maintain over time. Furthermore, domain knowledge of these homegrown solutions is lost
and upgrade paths become challenging.

At Buf, we believe code generation is a key building block and the Protobuf ecosystem deserves a proper solution.

The **remote plugin execution** feature makes it possible to remotely generate source code using hosted plugins in an
isolated environment on the BSR. By isolating code generation from its environment, you eliminate an entire class of
problems caused by subtle differences across specific compiler versions and custom Protobuf plugins.

All you need to get started is:

- The `buf` CLI
- A [`buf.gen.yaml`](../configuration/v1/buf-gen-yaml.md) file
- An [input](../reference/inputs.md) of your choice

With this setup a single developer or thousands of developers at a large organization are able to achieve stable and
reproducible code generation, while enjoying a simplified developer experience.

The Buf team has published a set of [official plugins](#official-plugins) for you to use, starting with all the
built-in `protoc` Protobuf plugins and popular ones such as gRPC plugins.

> To learn more about Buf Plugins check out the [Key concepts documentation](../bsr/remote-generation/overview.md).

## Official plugins

To discover plugins maintained by the Buf team, go to https://buf.build/plugins.
This page provides information on all available plugins, including the language type(s) and instructions for use
in `buf.gen.yaml`.

The packaging and distribution source code for Buf-managed plugins is available at https://github.com/bufbuild/plugins.

### protobuf language plugins

The Buf team has developed tooling to publish all the plugins built-in to `protoc`. Additionally, other third-party
plugins provide language support for languages unsupported by `protoc` (TypeScript, Dart, Swift). Here is a list of
supported language plugins:

- C++: https://buf.build/library/cpp
- C#: https://buf.build/library/csharp
- Dart: https://buf.build/library/dart
- Go: https://buf.build/library/go
- Java: https://buf.build/library/java
- JavaScript/TypeScript: https://buf.build/library/protobuf-es
- JavaScript (deprecated): https://buf.build/library/js
- Kotlin: https://buf.build/library/kotlin
- Objective C: https://buf.build/library/objc
- PHP: https://buf.build/library/php
- Python: https://buf.build/library/python
- Ruby: https://buf.build/library/ruby
- Swift: https://buf.build/library/swift

This is powerful because you no longer need to have `protoc` installed, or understand how to invoke it (a daunting task
in and of itself). Furthermore, you don't need to install additional plugins not already built-in to the `protoc`
compiler, such as [protoc-gen-go](https://pkg.go.dev/google.golang.org/protobuf/cmd/protoc-gen-go).

### RPC plugins

In addition to the plugins mentioned above, we're also adding support for popular RPC plugins for nearly all the same
languages. Here is a list of supported RPC plugins:

#### Connect

- https://buf.build/library/connect-go
- https://buf.build/library/connect-web

#### gRPC

- https://buf.build/library/grpc-cpp
- https://buf.build/library/grpc-csharp
- https://buf.build/library/grpc-go
- https://buf.build/library/grpc-java
- https://buf.build/library/grpc-kotlin
- https://buf.build/library/grpc-node
- https://buf.build/library/grpc-objc
- https://buf.build/library/grpc-php
- https://buf.build/library/grpc-python
- https://buf.build/library/grpc-ruby
- https://buf.build/library/grpc-swift
- https://buf.build/library/grpc-web

#### Twirp

- https://buf.build/library/twirp-go

## Example

This section provides an example of remote plugin execution.

We'll use the [buf.build/demolab/theweather](https://buf.build/demolab/theweather) module hosted on the BSR as the input
source. You can also use local Protobuf files, but for this example we'll use a hosted module to illustrate plugin
execution.

A hosted plugin can have a version specified, as is done below, or it can be omitted, if you want to always use the
latest version of the plugin.

Create a template file with these contents:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="language-selection"
defaultValue="go"
values={[
{label: 'Go', value: 'go'},
{label: 'JavaScript', value: 'javascript'},
{label: 'Python', value: 'python'},
{label: 'Ruby', value: 'ruby'},
{label: 'Java', value: 'java'},
]}>
<TabItem value="go">

```yaml title=buf.gen.yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/organization/repository/gen/go
plugins:
  - plugin: buf.build/library/go:v1.28.1
    out: gen/go
    opt: paths=source_relative
  - plugin: buf.build/library/grpc-go:v1.2.0
    out: gen/go
    opt:
      - paths=source_relative
      - require_unimplemented_servers=false
```

  </TabItem>
  <TabItem value="javascript">

```yaml title=buf.gen.yaml
version: v1
managed:
  enabled: true
plugins:
  - plugin: buf.build/library/js:v3.20.1
    out: gen/js
    opt:
      - import_style=commonjs
      - binary
  - plugin: buf.build/library/grpc-node:v1.11.2
    out: gen/js
    opt:
      - import_style=commonjs
```

  </TabItem>
  <TabItem value="python">

```yaml title=buf.gen.yaml
version: v1
managed:
  enabled: true
plugins:
  - plugin: buf.build/library/python:v21.5
    out: gen/python
  - plugin: buf.build/library/grpc-python:v1.48.1
    out: gen/python
```

  </TabItem>
  <TabItem value="ruby">

```yaml title=buf.gen.yaml
version: v1
managed:
  enabled: true
plugins:
  - plugin: buf.build/library/ruby:v21.5
    out: gen/ruby
  - plugin: buf.build/library/grpc-ruby:v1.48.1
    out: gen/ruby
```

  </TabItem>
  <TabItem value="java">

```yaml title=buf.gen.yaml
version: v1
managed:
  enabled: true
plugins:
  - plugin: buf.build/library/java:v21.5
    out: gen/java
  - plugin: buf.build/library/grpc-java:v1.49.0
    out: gen/java
```

  </TabItem>
</Tabs>

Note, we're using the `plugin` key to reference a hosted plugin. More information can
be [found in the buf.gen.yaml docs](https://docs.buf.build/configuration/v1/buf-gen-yaml#plugin-name-or-remote).

> As a best practice, when referencing hosted plugins we recommend including the version of the plugin to ensure
> reproducible code generation.

It is possible to reference both local and hosted plugins within a single template file. The `buf generate` command
issues an RPC to the BSR to execute the hosted plugins against the given input. Once execution is finished the output is
written out to disk.

```terminal
$ buf generate buf.build/demolab/theweather
```

You should end up with this structure:

<Tabs
groupId="language-selection"
defaultValue="go"
values={[
{label: 'Go', value: 'go'},
{label: 'JavaScript', value: 'javascript'},
{label: 'Python', value: 'python'},
{label: 'Ruby', value: 'ruby'},
{label: 'Java', value: 'java'},
]}>
<TabItem value="go">

```sh
.
├── buf.gen.yaml
└── gen
    └── go
        └── proto
            └── weather
                └── v1
                    ├── weather.pb.go
                    └── weather_grpc.pb.go
```

  </TabItem>
  <TabItem value="javascript">

```sh
.
├── buf.gen.yaml
└── gen
    └── js
        └── proto
            └── weather
                └── v1
                    ├── weather_grpc_pb.js
                    └── weather_pb.js
```

  </TabItem>
  <TabItem value="python">

```sh
.
├── buf.gen.yaml
└── gen
    └── python
        └── proto
            └── weather
                └── v1
                    ├── weather_pb2.py
                    └── weather_pb2_grpc.py
```

  </TabItem>
  <TabItem value="ruby">

```sh
.
├── buf.gen.yaml
└── gen
    └── ruby
        └── proto
            └── weather
                └── v1
                    ├── weather_pb.rb
                    └── weather_services_pb.rb
```

  </TabItem>
  <TabItem value="java">

```sh
.
├── buf.gen.yaml
└── gen
    └── java
        └── com
            └── weather
                └── v1
                    ├── GetWeatherRequest.java
                    ├── GetWeatherRequestOrBuilder.java
                    ├── GetWeatherResponse.java
                    ├── GetWeatherResponseOrBuilder.java
                    ├── WeatherProto.java
                    └── WeatherServiceGrpc.java
```

  </TabItem>
</Tabs>

## Wrapping up

Remote plugin execution simplifies the process of generating code for your Protobuf API. It also has the added benefit
of enforcing reproducible outputs by eliminating differences in the environment where generation takes place, such as a
developer's local machine or across continuous integration environments.

Bring your own Protobuf files, or publish them to the BSR, and then generate the corresponding client and server code in
your language of choice with hosted plugins on the BSR. You get all the benefits of code generation without the headache
of managing plugins or `protoc` versions.

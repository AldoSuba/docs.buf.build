---
id: overview
title: Overview
---

:::danger 🚧 under construction
the following text is placeholder only
:::

Protoc plugins are extensions to the protoc compiler that allow developers to generate custom code based on Protocol
Buffer definitions. These plugins can be written in any programming language and can perform a wide range of tasks, such
as generating code for a specific framework or library, generating documentation, or even performing code analysis.

To understand protoc plugins, it's important to be familiar with the following concepts:

- **Protocol Buffers**: Protocol Buffers is a language-agnostic data serialization format used for structured communication
between different systems. Protocol Buffer definitions are written in a special language, which is then compiled into
language-specific code.

- **Protoc compiler**: The protoc compiler is the official compiler for Protocol Buffers, and is used to generate
language-specific code based on Protocol Buffer definitions. The protoc compiler can be extended using plugins to
generate custom code.

- **Code generation**: Code generation is the process of automatically generating code based on a set of specifications. In
the context of Protocol Buffers, code generation is used to generate language-specific code based on Protocol Buffer
definitions.

- **Plugin architecture**: A plugin architecture is a design pattern that allows developers to extend the functionality of an
application by creating custom plugins. In the context of the protoc compiler, plugins can be used to extend the
functionality of the compiler to generate custom code.

- **Plugin API**: The plugin API is the set of interfaces and protocols that plugins must implement in order to interact with
the protoc compiler. The plugin API provides a standardized way for plugins to interact with the compiler and generate
custom code.

Protoc plugins can be used to generate code for any programming language or framework, and can be used to perform a wide
range of tasks. For example, a plugin could be used to generate code for a specific library or framework, such as
generating code for a REST API based on a set of Protocol Buffer definitions. Another plugin could be used to generate
documentation based on Protocol Buffer definitions, or even to perform code analysis to ensure that the generated code
adheres to specific guidelines or standards.

In summary, protoc plugins are extensions to the protoc compiler that allow developers to generate custom code based on
Protocol Buffer definitions. These plugins can be used to generate code for any programming language or framework, and
can be used to perform a wide range of tasks. To use protoc plugins effectively, it's important to be familiar with the
basics of Protocol Buffers, the protoc compiler, code generation, plugin architecture, and the plugin API.
---
id: getting-started-with-protocol-buffers
title: Getting Started with Protocol Buffers
description: Get ready for your mind to be blown with an introduction to Schema Driven Development!
---

Welcome to our beginner's guide to Protocol Buffers! Protocol Buffers, also known as protobuf, are a powerful and
efficient way to serialize and transmit data. In this guide, we'll explore the basics of protobuf, how to use them, and
some of the benefits they offer. Whether you're a seasoned developer or new to the world of data serialization, this
guide will provide you with the knowledge and tools you need to get started with protobuf and take your projects to the
next level. So, let's dive in and discover the magic of protobuf!

We'll start by discussing what protobuf are and the different use cases they're great for. Then, we'll set up our
development environment and get hands-on by defining message types and serializing/deserializing data. And the best part
is, protobufs are versatile, and we will also go over how to use them in different programming languages.

We'll also touch on some best practices and advanced topics such as using protobuf with gRPC and Connect for remote
procedure call and performance comparison with other serialization formats. By the end of this guide, you'll have a
strong understanding of protobuf and be able to use them in your own projects with confidence. So, let's get started
and discover the power of protobuf!

:::info

By the end of this guide, you will have a solid understanding of protobuf and be able to use them effectively in your
own projects.

:::

## Introduction to Protocol Buffers and their use cases

Protocol Buffers, also known as protobuf, are a powerful and efficient way to serialize and transmit data. Developed by
Google, protobuf has become a popular choice for data interchange in a variety of systems, from small-scale
applications to large-scale distributed systems.

Protobuf uses a compact binary format, which makes them more efficient than traditional text-based formats such as XML
and JSON. This makes them well-suited for use cases where bandwidth and storage are constrained, such as in mobile and
IoT applications. Additionally, protobuf offers a simple, language- and platform-agnostic way to define and transmit
data, which makes them useful for building systems that span multiple programming languages and platforms.

One of the major benefits of protobuf is performance, its fast and efficient in terms of both space and
time. Protobuf is also forward and backward compatible, meaning that you can add new fields to a message without
breaking
existing code. This feature is particularly useful when building distributed systems, where different parts of the
system may be running different versions of the code.

You may have heard of protobuf via gRPC, a high-performance, open-source framework for building remote
procedure call (RPC) APIs. gRPC uses protobuf for defining the service interface and payloads, which allows for
efficient and accurate communication between systems. This makes protobuf and gRPC a great combination for building
high-performance microservices and distributed systems.

Think of Protocol Buffers like a set of LEGOs. Each LEGO piece represents a small piece of data, like a name or an age.
These LEGOs can be combined in different ways to create different structures, just like how protobuf can be used to
create different message types. And just like how LEGOs can be used to build all sorts of things, protobuf can be used
to transmit all sorts of data. And like LEGOs are small and can be stored in a small box, protobuf use a compact binary
format that takes less space and is faster to transmit. Plus, you can add new LEGOs to the existing structures without
breaking them, just like how protobuf are forward and backward compatible.

Overall, protobuf provides a simple, efficient, and flexible way to serialize and transmit data, making them a great
choice for a wide range of use cases, from small-scale mobile applications to large-scale distributed systems.

## Setting up a development environment for protobuf

Setting up a development environment for working with Protocol Buffers is a straightforward process.

First, you'll need to install a compiler for Protocol Buffers, for the purposes of this guide we will
use [Bufs internal compiler](/reference/internal-compiler). You can install `buf` on macOS or Linux
using [Homebrew](https://brew.sh):

```terminal
$ brew install bufbuild/buf/buf
```

for more information check out our [installation guide](/installation)

It's that simple! With the above steps, you have successfully set up a development environment for working with
protobuf.

Now that you have `buf` installed, in the following steps we will start defining your message types. The syntax for
defining message types is called the Protocol Buffer Language. The language is designed to be simple and easy to use,
and you can find detailed documentation on the Protocol Buffers website (https://protobuf.com).

## Defining message types using the protobuf language

Defining message types using the Protocol Buffer Language (protobuf) is a key step in using Protocol Buffers
to serialize and transmit data. The protobuf language is designed to be simple and easy to use, and it provides a way to
define the structure of your data in a clear and consistent way.

### Field

The basic building block of a protobuf message is a field. A field has a unique name, a data type, and an integer tag
that is used to identify the field when the message is encoded or decoded. The following data types are supported by
protobuf:

| TYPE        | DESCRIPTION                                                |
|-------------|------------------------------------------------------------|
| **double**  | a 64-bit floating-point number                             |
| **float**   | a 32-bit floating-point number                             |
| **int32**   | a signed 32-bit integer                                    |
| **int64**   | a signed 64-bit integer                                    |
| **uint32**  | an unsigned 32-bit integer                                 |
| **uint64**  | an unsigned 64-bit integer                                 |
| **sint32**  | a signed 32-bit integer that uses variable-length encoding |
| **sint64**  | a signed 64-bit integer that uses variable-length encoding |
| **fixed32** | an unsigned 32-bit integer that uses fixed-length encoding |
| **fixed64** | an unsigned 64-bit integer that uses fixed-length encoding |
| **bool**    | a boolean value (true or false)                            |
| **string**  | a UTF-8 encoded string                                     |
| **bytes**   | a sequence of bytes                                        |
| **message** | a nested message                                           |
| **enum**    | an enumeration of named integer values                     |

### Message

A message is defined by a message block, which is a section of code that starts with the keyword "message" followed by
the name of the message. Inside the message block, you can define fields, enums and nested messages.

Here is an example of a simple message definition:

```protobuf
message Person {
    string name = 1;
    int32 age = 2;
    string email = 3;
}
```

This defines a message named "Person" that has three fields: "name", "age", and "email", each with a unique tag number.
The tag numbers are used to identify the fields when the message is encoded or decoded.

you can also define nested messages. This allows you to define complex data structures with a clear and
consistent structure. Here is an example of a message with a nested message:

```protobuf
message PhoneNumber {
  string number = 1;
  PhoneFormat format = 2;
}

enum PhoneFormat {
  PHONE_FORMAT_UNSPECIFIED = 0;
  PHONE_FORMAT_HOME = 1;
  PHONE_FORMAT_WORK = 2;
  PHONE_FORMAT_MOBILE = 3;
}
```

Here we create a `PhoneNumber` message which has two fields: `number` and an enum `PhoneFormat` with four values "
UNSPECIFIED", "HOME", "WORK" and "MOBILE" and a field `format` of type `PhoneFormat` in the message `PhoneNumber`.

Finally, putting it all together - you can also define fields as repeated, which means that the field can occur multiple
times within the message. To define a repeated field, you use the "repeated" keyword before the field type:

```protobuf
message Person {
  string name = 1;
  int32 age = 2;
  string email = 4;
  Address address = 5;
  repeated PhoneNumber phone_numbers = 6;
}

message Address {
  string street = 1;
  string city = 2;
  string state = 3;
  string zip = 4;
}

message PhoneNumber {
  string number = 1;
  PhoneFormat format = 2;
}

enum PhoneFormat {
  PHONE_FORMAT_UNSPECIFIED = 0;
  PHONE_FORMAT_HOME = 1;
  PHONE_FORMAT_WORK = 2;
  PHONE_FORMAT_MOBILE = 3;
}
```

In this example, the `Person` message has a nested `Address` message, and a repeated `PhoneNumber` with a `PhoneFormat`
enumeration, message. The repeated keyword is used to indicate that a field can have multiple values, in this case, a
person can have
multiple phone numbers.

Once you have defined your message types, you can use the `buf` compiler to generate code for the language you're
using. The generated code will include classes for each of your message types, as well as methods for encoding and
decoding messages.

### Service

To define a service, you need to add a service block to your .proto file that specifies the name of the service and the
methods it provides. Each method takes a request message and returns a response message. Start by adding a new service
block using the "service" keyword followed by the name of the service.

```protobuf
service MyService {
  // methods go here
}
```

Within the service block, define each method using the "rpc" keyword followed by the method name, the request message in
parentheses, and the response message after "returns".

```protobuf
service MyService {
  rpc HandleRequest (Request) returns (Response) {}
}
```

Define request and response messages, the same way we did with `Person` above.

```protobuf
message Request {
  int32 num = 1;
}

message Response {
  string result = 1;
}
```

Repeat this process for each method you want to define in the service.

```protobuf
service MyService {
  rpc HandleRequest (Request) returns (Response) {}
  rpc HandleAnotherRequest (AnotherRequest) returns (AnotherResponse) {}
}
```

Backward compatibility is an important aspect to consider when working with protobuf, as it ensures that older versions
of code can still correctly interpret new versions of messages. Protocol Buffers support backward compatibility by
allowing you to add new fields to a message without breaking existing code, meaning that older versions of code can
still decode and use messages that contain new fields.

The protobuf language provides several features to help you maintain backward compatibility. We will discuss this
further in this guide. Fortunately, `buf` supports breaking change detection to ensure you never break your users, for
more information checkout [our docs](/breaking/overview).

Overall, protobuf supports for backward compatibility and versioning allows you to add new features and make changes to
your messages without breaking existing code, making it a great choice for building systems that span multiple versions
of code.

## Using protobufs in different programming languages

You can use protobuf in a variety of programming languages, from C++ to Python, Java to Go, and many more. Using
Protocol Buffers in different programming languages is a great way to take advantage of the benefits of protobuf, such
as a compact binary format, efficient serialization and deserialization, and support for backward compatibility. We will
talk about this in greater detail in the next section but for now, lets find out about one of the most important pieces
to the protobuf ecosystem - Code Generation.

There are official libraries available for several popular programming languages, including C++, Java, Python, Go, C#,
and many others. These libraries provide a simple and consistent API for working with protobufs, regardless of the
language you're using.

* In C++, for example, you can use the Google's protobuf library to define message types, serialize and deserialize
  messages, and generate code for your messages. The library also provides support for advanced features such as
  reflection and dynamic message creation.

* In Java, you can use the same library, and it's available on maven central. The library provides a similar API as in
  C++
  and it's easy to use.

* In Python, Google's library is available via pip, and it provides an easy-to-use API for working with protobufs. The
  library also provides support for advanced features such as reflection and dynamic message creation.

* In Go, there is an official library provided by Google, and it's available via go get. It provides a similar API as in
  other languages, and it's also easy to use.

* In C#, there's an official library provided by Google, and it's available via nuget. It provides a similar API as in
  other languages, and it's easy to use as well.

The API for working with protobufs is consistent across different languages, and it's easy to learn and use, which makes
it a great choice for building systems that span multiple languages.

Additionally, there are also third-party libraries available for other languages such as Ruby, PHP, and many more. These
libraries provide similar functionality and API as the official libraries and can be used with protobufs.

One of the greatest challenges with Protobuf code generation is the complexity of working with `protoc`
and [plugins][plugins]. Time and time again, we've heard that developers want the benefits of code generation, but
struggle with the complex web of different compiler and plugin versions, and the varying runtime needs that plugins have
across different languages. Managing and maintaining a stable environment locally on a single machine is hard enough,
and the problem is compounded as you scale out code generation across many developers.

Every organization and open-source project develops homegrown Protobuf tooling in an effort to simplify the developer
experience and maintain consistent output across developers. A handful of organizations might get a workable solution,
but these remain brittle and difficult to maintain over time. Furthermore, domain knowledge of these homegrown solutions
is lost and upgrade paths become challenging.

At Buf, we believe code generation is a key building block and the Protobuf ecosystem deserves a proper solution. With *
*[remote plugins][plugins]**, you no longer have to concern yourself with maintaining, downloading, or
running [plugins][plugins] on your local machine.

In conclusion, using protobufs in different programming languages is an efficient and easy process. There are official
libraries available for several popular programming languages, and the API is consistent and easy to learn, which makes
it a great choice for building systems that span multiple languages. With the support of third-party libraries,
protobufs can be used in almost any programming language and with Buf Remote Plugins, code generation has never been
easier.

## Serializing and deserializing data using protobuf

Serializing and deserializing data using Protocol Buffers (protobufs) is a simple and efficient process. Serialization
is the process of converting an object or data structure into a format that can be transmitted over a network or stored
in a file. Deserialization is the opposite process of converting a serialized format back into an object or data
structure.

In protobuf, data is serialized into a compact binary format, which makes it more efficient than traditional text-based
formats such as XML and JSON. The serialized data can be transmitted over a network or stored in a file, and then
deserialized back into an object or data structure on the other end.

In a nutshell, Protocol Buffers have two main functions:

* They are a language for writing schemas for your data.
* They define a binary format for serializing your data.

These two independent traits function together to allow your project and everyone who interacts with it to define
messages, fields, and service APIs in the exact same way. In a practical sense as it relates
to [Protobuf-ES](https://github.com/bufbuild/protobuf-es), this means
no more disparate JSON types all over the place. Instead, you define a common schema in a Protobuf file, such as:

```protobuf
message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

To serialize a message, you need to first create an instance of the message class, set its fields, and then call the
toBinary()  method on the message instance. The method will return the serialized data as a byte array.

```javascript
let user = new User({
    firstName: "Homer",
    lastName: "Simpson",
    active: true,
    locations: ["Springfield"],
    projects: {SPP: "Springfield Power Plant"},
    manager: {
        firstName: "Montgomery",
        lastName: "Burns",
    },
});

const bytes = user.toBinary();
```

To deserialize a message, you need to call the `fromBinary()` or `fromJsonString()` method on an instance of the
message class, and pass in the serialized data as a byte array or string. The method will populate the
fields of the message instance with the data from the serialized data.

```python
let user = new User();
user = User.fromBinary(bytes);
user = User.fromJsonString('{"firstName": "Homer", "lastName": "Simpson"}');
```

It's important to note that, when deserializing a message, if the message contains new fields that were not present in
the original message, the new fields will be set to their default values. This is because of protobufs support of
backward compatibility.

Think of serializing and deserializing data using Protocol Buffers like packing and unpacking a suitcase for a trip.
Just like how you carefully choose what clothes and items to pack in your suitcase, you choose the fields of your
message to be serialized. The suitcase represents the serialized data, containing all the information you need for your
trip. When you arrive at your destination, you'll unpack your suitcase and use the items inside, just like how you'll
deserialize the data and use the fields in your message. And just like how you can add more clothes or items to your
suitcase for a future trip without affecting the ones that were already packed, you can add new fields to your message
without breaking the existing code thanks to protobufs support of backward compatibility.

The benefits can extend to any application that interacts with yours as well. This is because the Protobuf file above
can be used to generate types in many languages. The added bonus is that no one has to write any boilerplate code to
make this happen. [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Protocol Buffers also allow you to serialize this structured data. So, your application running in the browser can send
a `User` object to a backend running an entirely different language, but using the exact same definition. Using an RPC
framework like [Connect-Web](https://github.com/bufbuild/connect-web), your data is serialized into bytes on the wire
and then deserialized at its destination using the defined schema.

In summary, serializing and deserializing data using protobuf is a simple and efficient process. The compact binary
format used by protobuf makes it more efficient than traditional text-based formats, and the support for backward
compatibility allows you to make changes to your messages without breaking existing code. Whether you're a beginner just
getting started with protobuf or an experienced developer looking to take your skills to the next level, we've got you
covered. So don't forget to come back and check out our upcoming articles. We'll be excited to have you on board!

## Best practices for using protobufs in your projects

Think of using Protocol Buffers in your projects like building a house. Just like how you have to choose the
right materials and design to build a sturdy and long-lasting house, you have to choose the right design and best
practices to ensure that your code is efficient, maintainable, and scalable. Using the latest version of protobufs and
library is like using strong and durable bricks for your house. Using descriptive and clear field names, meaningful
enumeration names and comments is like using clear and accurate blueprint for your house. Keeping backward compatibility
in mind when modifying messages is like building a house with the future in mind, making sure it can be expanded or
renovated without the need to tear it down. Using linter and formatter tools is like hiring an architect to check the
design of your house and testing your code is like hiring an inspector to check the quality of your house. By following
these best practices, you can build a strong and long-lasting codebase, just like how you can build a strong and
long-lasting house.

When using Protocol Buffers in your projects, there are several best practices to keep in mind to ensure that your code
is efficient, maintainable, and scalable.

* **Use the latest version of protobufs**: As with any technology, it's important to keep up with the latest version of
  protobufs. Newer versions may include bug fixes, performance improvements, and new features. It is also recommended to
  use the latest version of the protobuf library for your programming language.

* **Use descriptive and clear field names**: Field names should be descriptive and clear, and should follow the naming
  conventions of the programming language you're using. This will make it easier to understand the structure of your
  messages and reduce the likelihood of errors.

* **Use meaningful enumeration names**: Enumerations should have meaningful names that reflect the values they
  represent.
  Avoid using short or abbreviated names, as they can be harder to understand and can lead to errors.

* **Use comments to document your code**: Comments can be used to document your code and explain the purpose of your
  messages
  and fields. Comments can be added to messages, fields, and enumerations using the // syntax.

* **Use the repeated keyword for repeated fields**: The repeated keyword is used to indicate that a field can have
  multiple
  values. When using the repeated keyword, it is recommended to use the packed format which can be more efficient and
  can
  help maintain backward compatibility.

* **Keep backward compatibility in mind when modifying messages**: When making changes to your messages, it's important
  to
  keep backward compatibility in mind. Adding new fields or changing the types of existing fields can break existing
  code. It is recommended to use the [default = value] option to specify a default value for new fields, and to use
  the [deprecated = true] option to mark fields that are going to be removed in the future.

* **Use the linter and formatter tools**: There are tools available like buf (https://buf.build/) which can be used to
  lint,
  format, and detect breaking change in your .proto files. This can be a great way to catch errors and ensure that your
  code is consistent and readable.

Using Protocol Buffers in your projects can bring many benefits, such as a compact binary format, efficient
serialization and deserialization, and support for backward compatibility. By following the best practices outlined in
this article, you can ensure that your code is efficient, maintainable, and scalable, which can save you time and effort
in the long run.

## Advanced topics with protocol buffers

### gRPC

gRPC is a high-performance, open-source framework for building remote procedure call (RPC) APIs. It uses the Protocol
Buffers (protobufs) data serialization format for efficient and compact data transmission. gRPC allows you to define
your API using a simple and efficient IDL (Interface Definition Language), and generates client and server code for
multiple languages, including C++, Java, Python, and Go.

One of the main advantages of using gRPC with protobufs is its support for bidirectional streaming. This allows for
real-time communication, where the client and server can send messages back and forth as soon as they are available,
rather than waiting for a response to a request.

Another advantage is the ability to flow control, which enables the flow of data to be adjusted dynamically between the
client and the server. This can be useful in situations where the server is handling a large amount of data and needs to
slow down the flow to avoid overloading.

In gRPC, you define your API using a `.proto` file, which describes the service, the methods, and the request and
response
messages. Once the `.proto` file is defined, you can use the `buf` compiler to generate the client and server code for
your desired language.

Here's an example of a simple gRPC service defined in a .proto file:

```protobuf
syntax = "proto3";

package example;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}

message HelloRequest {
  string name = 1;
}

message HelloResponse {
  string message = 1;
}
```

This file declares the greet.v1 Protobuf package, a service called GreetService, and a single method called Greet with
its request and response structures. These package, service, and method names will reappear soon in our HTTP API's URLs.

We're going to generate our code using Buf, a modern replacement for Google's protobuf compiler. We installed Buf
earlier, but we also need a few configuration files to get going. (If you'd prefer, you can skip this section and use
protoc instead — `protoc-gen-es` and `protoc-gen-grpc-node` behaves like any other plugin.)

First, scaffold a basic `buf.yaml` by running buf `mod init`. Next, tell Buf how to generate code by putting this into
`buf.gen.yaml`:

```yaml
version: v1
plugins:
  - plugin: buf.build/bufbuild/es
    out: gen
    opt: target=js+dts
  - plugin: buf.build/grpc/node
    out: gen
```

With those configuration files in place, you can lint your schema and generate code:

```terminal
buf lint
buf generate
```

This command will generate the Javascript code for the client and server. In your gen directory, you should now see some
generated code:

```
gen
└── greet
    └── v1
        ├── greet.js
        └── greet.pb.js
```

The package `gen/greet/v1` contains `greet.js`, which was generated by Buf's protoc-gen-es, and it contains the
`GreetRequest` and `GreetResponse` structs and the associated marshaling code. Also greet.pb.js, which was generated by
`protoc-gen-grpc-node`, and it contains the HTTP handler and client interfaces and constructors.

:::danger include grpc implementation
This needs work
:::

In summary, using protobuf with gRPC is a powerful combination for building efficient and high-performance remote
procedure call (RPC) APIs. gRPC provides support for bidirectional streaming, flow control, and efficient data
transmission using the protobuf data serialization format. With gRPC, you can define your API using a simple and
efficient IDL, and generate client and server code for multiple languages.

It's important to note that gRPC is not the only framework that can be used with protobuf, other alternatives are also
available like Connect and Twirp, each with its own advantages. It's always good to evaluate the use case and choose the
right tool for the job.

### Connect

Connect is a slim library for building browser- and gRPC-compatible HTTP APIs. You define your service with a Protocol
Buffer schema, and Connect generates type-safe server and client code. Fill in your server's business logic, and you're
done — no handwritten marshaling, routing, or client code
required! [check it out](https://connect.build/docs/web/getting-started)


[plugins]: https://buf.build/plugins
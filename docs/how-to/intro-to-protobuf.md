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


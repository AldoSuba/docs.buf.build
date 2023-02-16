---
id: messages-enums-services
title: Messages Enums & Services
---

In this reference guide, we will explore three key components of Protobuf: Messages, Enums, and Services. We'll start by
explaining what Messages are and how they are used to define data structures in Protobuf. Next, we'll dive into Enums,
which are used to define a set of named values for a message field. Finally, we'll cover Services, which are used to
define RPC methods that can be called by remote clients.

Throughout this guide, we'll provide clear and concise examples in Protobuf syntax to illustrate each concept. We'll
also highlight common pitfalls and best practices to help you avoid common mistakes and write efficient Protobuf code.
Whether you're new to Protobuf or an experienced developer, this reference guide will serve as a valuable resource for
mastering Protobuf Messages, Enums, and Services.

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
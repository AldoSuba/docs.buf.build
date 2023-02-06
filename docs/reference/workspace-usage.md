---
id: workspace-usage
title: Use a workspace
---

In this guide, we will look at how to use a [workspace](../reference/workspaces.mdx) to better organize your Protobuf
definitions.

Let us consider a development environment with a single module called `petapis`.

```
petapis
├── buf.yaml
└── pet
    └── v1
        └── pet.proto
```

The `petapis` module has a config file:

```yaml title="petapis/buf.yaml"
version: v1
name: buf.build/$BUF_USER/petapis
breaking:
  use:
- FILE
lint:
  use:
- DEFAULT
```

Now let us consider a kind of logical separation you often find in larger organizations, where one team would own
a `paymentapis` module while another would own `petapis`.

## Create a module {#create-a-module}

You can enact a separation like this by creating a separate directory and initializing a Buf module there:

```terminal
mkdir paymentapis
cd paymentapis
buf mod init
```

That creates a config file, we will add a `name` to represent the module:

```yaml title="paymentapis/buf.yaml"
version: v1
name: buf.build/$BUF_USER/paymentapis
breaking:
  use:
- FILE
lint:
  use:
- DEFAULT
```

Now that the module is all set up, we can add an API:

```terminal
mkdir -p payment/v1alpha1
touch payment/v1alpha1/payment.proto
```

```protobuf title="paymentapis/payment/v1alpha1/payment.proto"
syntax = "proto3";

package payment.v1alpha1;

option go_package = "github.com/bufbuild/buf-tour/petstore/gen/proto/go/payment/v1alpha1;paymentv1alpha1";

import "google/type/money.proto";

// PaymentProvider represents the supported set
// of payment providers.
enum PaymentProvider {
  PAYMENT_PROVIDER_UNSPECIFIED = 0;
  PAYMENT_PROVIDER_STRIPE = 1;
  PAYMENT_PROVIDER_PAYPAL = 2;
  PAYMENT_PROVIDER_APPLE = 3;
}

// Order represents a monetary order.
message Order {
  string order_id = 1;
  string recipient_id = 2;
  google.type.Money amount = 3;
  PaymentProvider payment_provider = 4;
}
```

For this example, our local file structure now contains 2 sibling modules:

```
.
├── paymentapis
│   ├── buf.lock
│   ├── buf.yaml
│   └── payment
│       └── v1alpha1
│           └── payment.proto
└── petapis
    ├── buf.lock
    ├── buf.yaml
    └── pet
        └── v1
            └── pet.proto
```

## Build the module {#build-the-module}

If you try to build the `paymentapis` module in its current state, you'll get an error:

```terminal
buf build
---
payment/v1alpha1/payment.proto:7:8:google/type/money.proto: does not exist
```

To fix this, add the `buf.build/googleapis/googleapis` dependency and resolve it like before:

```yaml title="paymentapis/buf.yaml" {3-4}
 version: v1
 name: buf.build/$BUF_USER/paymentapis
 +deps:
   +  - buf.build/googleapis/googleapis
 lint:
   use:
 - DEFAULT
 breaking:
   use:
 - FILE
```

Now update your dependencies and try building again:

```terminal
buf mod update
buf build
```

The `paymentapis` module is ready to be used, but it's not yet clear if the API is stable. Given that these APIs are
meant to be used by other services, you need to test it in other applications to make sure it's the API you should to
commit to. In general, such APIs should include an
unstable[`PACKAGE_VERSION_SUFFIX`](../lint/rules.md#package_version_suffix), such as the`v1alpha1` version used above,
to convey that these packages are still in development and can have breaking changes.

You can also use a **workspace** so that you can iterate on multiple modules locally without pushing anything to the
BSR. Then, only after you've verified that the API is what you want to move forward with, you can push the version to
the BSR so that it can be used by others.

In summary, workspaces prevent you from pushing up a new version of your module to the BSR every time you want to test
the changes in another. Instead, you can do it all locally first.

## Define a workspace {#define-a-workspace}

A workspace is defined with a [`buf.work.yaml`](../configuration/v1/buf-work-yaml.md) file, which is generally placed at
the root of a version-controlled repository. Given that you're working from within the root of the `start` directory,
the `buf.work.yaml` should be placed there. For the configuration, you only need to specify the paths of the modules you
want to include in the workspace. Here's what the config looks like for the `paymentapis` and `petapis` modules:

```terminal
cd ..
touch buf.work.yaml
```

```yaml title="buf.work.yaml"
version: v1
directories:
  - paymentapis
  - petapis
```

Your directory structure should now look like this:

```sh
start/
├── buf.work.yaml
├── paymentapis
│   ├── buf.lock
│   ├── buf.yaml
│   └── payment
│       └── v1alpha1
│           └── payment.proto
└── petapis
     ├── buf.lock
     ├── buf.md
     ├── buf.yaml
     └── pet
         └── v1
             └── pet.proto
```

Behind the scenes, `buf` recognizes that there is a `buf.work.yaml` in one of the target input's parent directories
&#40;which so happens to be the current directory&#41;, and creates a workspace that contains all the files contained
in each of the modules. So when we include the `paymentapis` directory in the`buf.work.yaml` the local copy of
the `payment/v1alpha1/payment.proto` is available to all of the files contained in the `petapis` module.

## Multiple module operations {#multiple-module-operations}

If the input for a `buf` command is a directory containing a `buf.work.yaml` file, the command will act upon all the 
modules defined in the `buf.work.yaml`.

For example, suppose that we update both the `paymentapis` and `petapis` directories with some `lint` failures, such as 
violating `FIELD_LOWER_SNAKE_CASE`. You can `lint` all of the modules defined in the `buf.work.yaml` with a single 
command:

```protobuf title="paymentapis/payment/v1/payment.proto" {2-3}
message Order {
-  string order_id = 1;
+  string orderID = 1;
  string recipient_id = 2;
  google.type.Money amount = 3;
  PaymentProvider payment_provider = 4;
}
```

```protobuf title="petapis/pet/v1/pet.proto" {2-3}
message GetPetRequest {
-  string pet_id = 1;
+  string petID = 1;
}
```

```terminal
buf lint
---
paymentapis/payment/v1alpha1/payment.proto:20:10:Field name "orderID" should be lower_snake_case, such as "order_id".
petapis/pet/v1/pet.proto:28:10:Field name "petID" should be lower_snake_case, such as "pet_id".
```

The same holds true for the other `buf` operations including `buf (breaking|build|generate|ls-files)`.

Again, before we continue, make sure to restore the `.proto` files to their previous state:

```protobuf title="paymentapis/payment/v1/payment.proto" {2-3}
message Order {
-  string orderID = 1;
+  string order_id = 1;
  string recipient_id = 2;
  google.type.Money amount = 3;
  PaymentProvider payment_provider = 4;
}
```

```protobuf title="petapis/pet/v1/pet.proto" {2-3}
message GetPetRequest {
-  string petID = 1;
+  string pet_id = 1;
}
```

## Workspaces and the Buf Schema Registry

[Workspaces](../reference/workspaces.mdx) enable you to work with and modify multiple
local [modules](../bsr/overview.mdx#modules) at the same time. Once you're satisfied with your changes and are ready to
push them to the [BSR](../bsr/overview.mdx), there are a few things you should keep in mind to make sure everything
works as you expect.

### Try to push {#try-to-push}

When working with workspaces locally, if you try to push your Buf module to the BSR you might get this error:

```terminal
buf push
---
Failure: pet/v1/pet.proto:5:8:payment/v1alpha1/payment.proto: does not exist.
```

This is a bit puzzling because you can successfully build the module locally:

```terminal
buf build
```

Recall that you can only build the module because of the [`buf.work.yaml`](/configuration/v1/buf-work-yaml.md) file
in the project root directory. Without this file, the module doesn't have access to the files provided by its
workspace sibling module.

That's because **workspaces only apply to local operations**. When you're ready to push any updates you've made in a
local workspace, you need to push each module _independently_, starting with the upstream modules first. Once the
upstream module's changes are published, you can update the downstream module to fetch the latest version, and continue
to push each of your modules until all of your local changes are published to the BSR.

For our example, here's the proper order for publishing updates:

1. `paymentapis`
1. `petapis`
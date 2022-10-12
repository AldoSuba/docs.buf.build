---
id: use-remote-execution
title: 11 Use Remote Execution
---

So far, you've created a new [module](../bsr/overview.md#modules), pushed it up to the
[BSR](../bsr/overview.md), interacted with generated [documentation](view-generated-documentation.md),
and added a dependency on the `buf.build/googleapis/googleapis` module. Then, implemented the
`PetStoreService` as a Go application using local plugin execution. Next, you will do the same with remote plugin
execution.

Before you continue, move to the `start` directory again. If you're coming from the [previous
step](add-a-dependency), you can run this command:

```terminal
$ cd ..
```

You should also reset the `gen` directory so that you can generate everything remotely from a clean slate.

```terminal
$ rm -rf gen
```

The `start` directory should now look like this:

```sh
start/
├── buf.gen.yaml
└── petapis
    ├── buf.lock
    ├── buf.md
    ├── buf.yaml
    └── pet
        └── v1
            └── pet.proto
```

## 11.1 Edit your `buf.gen.yaml` {#edit-your-bufgenyaml}

Edit the [`buf.gen.yaml`](../configuration/v1/buf-gen-yaml.md) file so that it configures the
`protoc-gen-go` and `protoc-gen-go-grpc` plugins (and their options):

```yaml title="buf.gen.yaml" {3-14}
 version: v1
 plugins:
-  - plugin: go
+  - plugin: buf.build/library/go:v1.28.1
    out: gen/proto/go
    opt: paths=source_relative
-  - plugin: go-grpc
+  - plugin: buf.build/library/go-grpc:v1.2.0
    out: gen/proto/go
    opt:
      - paths=source_relative
      - require_unimplemented_servers=false
```

These edits remove the local code generation from a previous step and replace it with remote plugins for
generation outputs:

* The `protoc-gen-go` plugin will generate Go code to the same directory but the action will take place
  at `buf.build/library/go:v1.28.1`
* Similarly, the `protoc-gen-go-grpc` plugin will generate Go code to the same directory with
  at `buf.build/library/go-grpc:v1.2.0`

## 11.2 Generate Go/gRPC client and server stubs {#generate-stubs}

Now that you have a `buf.gen.yaml` with the remote plugins configured, you can generate the code
required to implement the `PetStoreService` API with Go.

Run this command, which targets the version of the module your pushed to the BSR earlier:

```terminal
$ buf generate buf.build/$BUF_USER/petapis
```

If successful, you'll notice the files we previously deleted from the `gen/proto/go` directory (as configured by
the `buf.gen.yaml` created above):

```sh
start/
├── buf.gen.yaml
├── gen
│   └── proto
│       └── go
│           └── pet
│               └── v1
│                   ├── pet.pb.go
│                   └── pet_grpc.pb.go
└── petapis
    ├── buf.lock
    ├── buf.md
    ├── buf.yaml
    └── pet
        └── v1
            └── pet.proto
```

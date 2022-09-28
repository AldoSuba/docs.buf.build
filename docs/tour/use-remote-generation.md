---
id: use-remote-generation
title: 16 Bonus — Use remote generation
---

In this section, you'll learn how to use Buf's Go Module Proxy to import the Go/gRPC client and
server stubs as you would import any other Go library. Remote generation thus reduces the code
generation workflow to two steps:

1. `buf push`
2. `go get` (or `go mod tidy`)

## 16.1 Remove `buf.gen.yaml` {#remove-bufgenyaml}

You won't need to generate any code locally at this stage, so you can remove the `buf.gen.yaml` as
well as the generated code in the `gen` directory:

```sh
rm buf.gen.yaml
rm -rf gen
```

As expected, if you try to recompile your Go program, you'll notice a compilation error:

```terminal
$ go build ./...
---
client/main.go:10:2: no required module provides package github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1; to add it:
  go get github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1
```

## 16.2 Depend on `buf.build/gen/go` {#depend-on-gobufbuild}

You can depend on the same Go/gRPC client and server stubs by adapting our import paths.

In short, the plugins are exeucted remotely on the BSR and the generated code is served via the Go Module Proxy protocol.

The [Go module path](../bsr/remote-generation/go.md#proxy) you need to use is
derived from the name of the module you want to generate *for* and the name of the plugin you want
to generate *with*:

<Syntax
    title="Generated Go module path syntax"
    examples={[
        "buf.build/gen/go/bufbuild/eliza/library/grpc-go"
    ]}
    segments={[
        {"label": "buf.build/gen/go", "kind": "constant"},
        {"separator": "/"},
        {"label": "moduleOwner", "kind": "variable", href: "/bsr/overview#modules"},
        {"separator": "/"},
        {"label": "moduleName", "kind": "variable", href: "/bsr/overview#modules"},
        {"separator": "/"},
        {"label": "pluginOwner", "kind": "variable", href: "/bsr/remote-generation/remote-plugin-execution"},
        {"separator": "/"},
        {"label": "pluginName", "kind": "variable", href: "/bsr/remote-generation/remote-plugin-execution"},
    ]}
/>

With the module `buf.build/$BUF_USER/petapis` and plugin `buf.build/library/grpc-go`, for example, the
import path looks like this:

```sh
buf.build/gen/go/$BUF_USER/petapis/library/grpc-go
```

Update your import paths accordingly:

```go title="client/main.go" {8-12,30-31}
  package main

 import (
     "context"
     "fmt"
     "log"

-    // This import path is based on the name declaration in the go.mod,
-    // and the gen/proto/go output location in the buf.gen.yaml.
-    petv1 "github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1"
+    petv1 "buf.build/gen/go/$BUF_USER/petapis/library/go/pet/v1"
+    petv1grpc "buf.build/gen/go/$BUF_USER/petapis/library/grpc-go/pet/v1/petv1grpc"
     "google.golang.org/grpc"
 )

func main() {
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    connectTo := "127.0.0.1:8080"
    conn, err := grpc.Dial(connectTo, grpc.WithBlock(), grpc.WithInsecure())
    if err != nil {
        return fmt.Errorf("failed to connect to PetStoreService on %s: %w", connectTo, err)
    }
    log.Println("Connected to", connectTo)

-    petStore := petv1.NewPetStoreServiceClient(conn)
+    petStore := petv1grpc.NewPetStoreServiceClient(conn)
    if _, err := petStore.PutPet(context.Background(), &petv1.PutPetRequest{
        PetType: petv1.PetType_PET_TYPE_SNAKE,
        Name: "Ekans",
    }); err != nil {
        return fmt.Errorf("failed to PutPet: %w", err)
    }

    log.Println("Successfully PutPet")
    return nil
}
```

```go title="server/main.go" {9-13,31-32,43-44}
 package main

 import (
     "context"
     "fmt"
     "log"
     "net"

-    // This import path is based on the name declaration in the go.mod,
-    // and the gen/proto/go output location in the buf.gen.yaml.
-    petv1 "github.com/bufbuild/buf-tour/petstore/gen/proto/go/pet/v1"
+    petv1 "buf.build/gen/go/$BUF_USER/petapis/library/go/pet/v1"
+    petv1grpc "buf.build/gen/go/$BUF_USER/petapis/library/grpc-go/pet/v1/petv1grpc"
     "google.golang.org/grpc"
 )

func main() {
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    listenOn := "127.0.0.1:8080"
    listener, err := net.Listen("tcp", listenOn)
    if err != nil {
        return fmt.Errorf("failed to listen on %s: %w", listenOn, err)
    }

    server := grpc.NewServer()
-   petv1.RegisterPetStoreServiceServer(server, &petStoreServiceServer{})
+   petv1grpc.RegisterPetStoreServiceServer(server, &petStoreServiceServer{})
    log.Println("Listening on", listenOn)
    if err := server.Serve(listener); err != nil {
        return fmt.Errorf("failed to serve gRPC server: %w", err)
    }

    return nil
}

// petStoreServiceServer implements the PetStoreService API.
type petStoreServiceServer struct {
-   petv1.UnimplementedPetStoreServiceServer
+   petv1grpc.UnimplementedPetStoreServiceServer
}

// PutPet adds the pet associated with the given request into the PetStore.
func (s *petStoreServiceServer) PutPet(ctx context.Context, req *petv1.PutPetRequest) (*petv1.PutPetResponse, error) {
    name := req.GetName()
    petType := req.GetPetType()
    log.Println("Got a request to create a", petType, "named", name)

    return &petv1.PutPetResponse{}, nil
}
```

Now if you run the command below, you'll notice that the remote-generated library is
successfully resolved:

```terminal
$ go mod tidy
---
go: finding module for package buf.build/gen/go/$BUF_TOUR/petapis/library/grpc-go/pet/v1/petv1grpc
go: finding module for package buf.build/gen/go/$BUF_TOUR/petapis/library/go/pet/v1
go: downloading buf.build/gen/go/$BUF_TOUR/petapis/library/go v1.28.1-20220907172654-7abdb7802c8f.5
go: found buf.build/gen/go/$BUF_TOUR/petapis/library/go/pet/v1 in buf.build/gen/go/$BUF_TOUR/petapis/library/go v1.28.1-20220907172654-7abdb7802c8f.5
go: found buf.build/gen/go/$BUF_TOUR/petapis/library/grpc-go/pet/v1/petv1grpc in buf.build/gen/go/$BUF_TOUR/petapis/library/grpc-go v1.2.0-20220907172654-7abdb7802c8f.4
go: downloading buf.build/gen/go/$BUF_TOUR/paymentapis/library/go v1.28.1-20220907172603-9a877cf260e1.5
```

The Go/gRPC client and server stubs are now included in your `go.mod` just like any other Go
library.

## 16.3 Run the application {#run-the-application}

You can run the application again to verify that the remote-generated library works as expected.

First, start the server:

```terminal
$ go run server/main.go
---
... Listening on 127.0.0.1:8080
```

In a separate terminal, run the client and you'll see a successful `PutPet` operation:

```terminal
$ go run client/main.go
---
... Connected to 127.0.0.1:8080
... Successfully PutPet
```

You'll also notice this in the server logs (in the other terminal running the server):

```terminal
$ go run server/main.go
---
... Listening on 127.0.0.1:8080
... Got a request to create a PET_TYPE_SNAKE named Ekans
```

Everything works just as before, but you no longer have *any* locally generated code:

```sh
start/
├── buf.work.yaml
├── client
│   └── main.go
├── go.mod
├── go.sum
├── paymentapis
│   ├── buf.lock
│   ├── buf.yaml
│   └── payment
│       └── v1alpha1
│           └── payment.proto
├── petapis
│   ├── buf.lock
│   ├── buf.md
│   ├── buf.yaml
│   └── pet
│       └── v1
│           └── pet.proto
└── server
    └── main.go
```

## 16.4 Versions

Now that your Go code depends on a remote-generated library, it's important to be aware of how it's
versioned. The challenge with versioning remote generation is that the generated code is the product
of two inputs:

* The Protobuf module
* The [plugin](/bsr/remote-generation/remote-plugin-execution#official-plugins) version

Using a combination of plugin version and module commit information we version using the following syntax:

import Syntax from "@site/src/components/Syntax";

<Syntax
  title="Go module version syntax"
  examples={["v1.2.0-20220907172654-7abdb7802c8f.4"]}
  segments={[
    {label: "pluginVersion", kind: "variable"},
    {separator: "-"},
    {label: "moduleTimestamp", kind: "variable"},
    {separator: "-"},
    {label: "moduleCommit", kind: "variable"},
    {separator: "."},
    {label: "pluginRevision", kind: "variable"}
  ]
} />

In the example above, the version `v1.2.0-20220907172654-7abdb7802c8f.4` represents the **v1.2.0** version of the plugin and the
**7abdb7802c8f** commit of a Protobuf module. In the example `go.mod` below, the `petapis` module uses
the **7abdb7802c8f** commit of the Protobuf module and the **v1.28.1** version of the plugin:

```sh title="go.mod" {6}
module github.com/bufbuild/buf-tour/petstore

go 1.16

require (
  buf.build/gen/go/$BUF_TOUR/petapis/library/go v1.28.1-20220907172654-7abdb7802c8f.5
  google.golang.org/genproto v0.0.0-20210811021853-ddbe55d93216 // indirect
  google.golang.org/grpc v1.40.0
)
```

## 16.5 Updating Versions {#updating-versions}

When you update your module and push new commits, you can update your library version.

To demonstrate, make a small change by adding a comment to the `PetStoreService`:

```terminal
$ cd petapis
```

```protobuf title="petapis/pet/v1/pet.proto" {1}
+// PetStoreService defines a pet store service.
 service PetStoreService {
   rpc GetPet(GetPetRequest) returns (GetPetResponse) {}
   rpc PutPet(PutPetRequest) returns (PutPetResponse) {}
   rpc DeletePet(DeletePetRequest) returns (DeletePetResponse) {}
   rpc PurchasePet(PurchasePetRequest) returns (PurchasePetResponse) {}
 }
```

Push those changes:

```terminal
$ buf push
---
8535a2784a3a48f6b72f2cb80eb49ac7
```

Now use `go get` to get the latest version:

```terminal
$ go get buf.build/gen/go/$BUF_TOUR/petapis/library/go@latest
```

Once you run the above command you'll notice that your `go.mod` is updated to the latest version.
This can be verified with the commit hash that in the version which is the same as the `buf push` output.

```sh title="go.mod" {6-7}
 module github.com/bufbuild/buf-tour/petstore

 go 1.16

 require (
-    buf.build/gen/go/$BUF_TOUR/petapis/library/go v1.28.1-20220907172654-7abdb7802c8f.5
+    buf.build/gen/go/$BUF_TOUR/petapis/library/go v1.28.1-20221108285234-8535a2784a3a.5
     google.golang.org/genproto v0.0.0-20210811021853-ddbe55d93216 // indirect
     google.golang.org/grpc v1.40.0
 )
```

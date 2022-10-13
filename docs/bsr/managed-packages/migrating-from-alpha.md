---
id: migrating-from-alpha
title: Migrating from alpha
---

# Migrating from alpha

We made improvements to the remote generation features of the BSR and have revamped the documentation. This guide walks
you through those changes and outlines exactly what you need to update if you were an existing user.

Updated documentation can be found here:

- [Remote plugin execution][bsr-hosted-plugins]
- [BSR npm registry][npm-registry]
- [BSR go module proxy][go]

Existing remote generation alpha documentation is located under Reference / Deprecated / Remote Generation.

## Disable plugin uploads

You will no longer be able to upload plugins or create templates based on those plugins.

For now, the Buf team will package and distribute plugins to the BSR, browsable at [buf.build/plugins][bsr-plugins]. To
learn more about how plugins are packaged and distributed check out the [bufbuild/plugins repository][bufbuild-plugins].

If you find a useful plugin that should be added please [file an issue][bufbuild-plugins-issue]!

:::info What happens to old plugins and templates?

Existing plugins and templates on the public BSR (https://buf.build) will remain available, but will be removed at a
later date. We take breaking changes very seriously and want to provide ample opportunity for our valued users to
migrate and request plugins which have not yet been added.

User uploaded plugins will be supported for Enterprise customers.

:::

## Templates removed

Templates were yet another concept for users to understand when interacting with the BSR, so we removed them. Instead,
you reference plugins directly by name. A list of plugins can be found at:

https://buf.build/plugins

All hosted plugins can be used as `plugin` references in `buf.gen.yaml` files.

Some plugins can be used with the BSR go module proxy and BSR npm registry.

### Versioning

The synthetic versioning scheme has been replaced by a more explicit versioning scheme comprised of the plugin version,
module reference (datetime+short commit name) and revision. Example:

```
0.4.0-20220908151351-622fe7149695.1
```

This new semver-compatible versioning scheme can be pinned in lock files and always references a specific plugin +
module for reproducibility.

Most users will be fetching `@latest` and will be unaffected by the versioning change.

## buf.gen.yaml

The buf.gen.yaml configuration file is largely unchanged, except for:

1. `name` and `remote` keys to reference plugins changed to just `plugin`. The `plugin` key understands both local and
   remote references. Requires [buf CLI version 1.8][buf-tag-18] or later.

1. Drop the `../plugins/..` path when referencing hosted plugins

Full example covering both changes:

```diff
plugins:
-  - remote: buf.build/bufbuild/plugins/connect-go
+  - plugin: buf.build/library/connect-go
```

## Go module proxy

There are a couple of key changes from the alpha:

- The base URL has changed to `buf.build/gen/go`
- The path has changed to begin with the module name.
- The template reference in the path has been replaced with plugins and moved to the end.
- The version has changed to inlcude plugin version and module commit information.

The new format is:

`buf.build/gen/go/{moduleOwner}/{moduleName}/{pluginOwner}/{pluginName}`

```diff
- go.buf.build/protocolbuffers/go/acme/petapis
+ buf.build/gen/go/acme/petapis/library/go
```

This means you'll need to search and replace the old import path with the new one and run `go mod tidy`.

The versioning has also changed to a more descriptive form:

`{pluginVersion}-{moduleCommitTimestamp}-{moduleCommitName}.{pluginRevision}`

Instead of relying on the commit sequence it now relies directly on commits. For ways to pin to a commit and other
documentation please see the new [Go proxy][go-proxy] docs.

### connect-go template

If you've used the [connect go template][bsr-template-connect-go] you'll need to update all **connect** imports to the
generated code of the connect plugin.

The `go.mod` will now require two different imports, one for the [`go`][bsr-plugin-go] plugin and the other for
the [`connect-go`][bsr-plugin-connect-go] plugin.

```diff title=go.mod
- go.buf.build/bufbuild/connect-go/acme/petapis
+ buf.build/gen/go/acme/petapis/library/go
+ buf.build/gen/go/acme/petapis/library/connect-go
```

Example:

```diff
package main

import (
-  petv1 "go.buf.build/bufbuild/connect-go/acme/petapis/pet/v1"
-  petv1connect "go.buf.build/bufbuild/connect-go/acme/petapis/pet/v1/petv1connect"
+  petv1 "buf.build/gen/go/acme/petapis/library/go/pet/v1"
+  petv1connect "buf.build/gen/go/acme/petapis/library/connect-go/pet/v1/petv1connect"
)
```

### grpc/go template

If you've used the [`grpc/go` template][bsr-template-grpc-go] you'll need to update all **grpc** imports to the
generated code of the grpc plugin.

The `go.mod` will now require two different imports, one for the [`go`][bsr-plugin-go] plugin and the other for
the [`grpc-go`][bsr-plugin-grpc-go] plugin.

```diff title=go.mod
- go.buf.build/grpc/go/acme/petapis
+ buf.build/gen/go/acme/petapis/library/go
+ buf.build/gen/go/acme/petapis/library/grpc-go
```

We patched the [`grpc-go`][bsr-plugin-grpc-go] plugin to generate code to a sub package. Earlier it used to generate
code to the same package as the [`go`][bsr-plugin-go] plugin. The new import path is a subpackage that is named in the
format: `{goPackageName}grpc`

Example:

```diff
package main

import (
-  petv1 "go.buf.build/grpc/go/acme/petapis/pet/v1"
+  petv1 "buf.build/gen/go/acme/petapis/library/go/pet/v1"
+  petv1grpc "buf.build/gen/go/acme/petapis/library/grpc-go/pet/v1/petv1grpc"
)

func main() {
  ...
-  client := petv1.NewPetStoreServiceClient(conn)
+  client := petv1grpc.NewPetStoreServiceClient(conn)
  res, err := client.GetPet(ctx, &petv1.GetPetRequest{})
  ...
}
```

### protoc-gen-validate plugin

If you've used a custom template that included the [`protoc-gen-validate`][protoc-gen-validate] plugin as of now there
is no direct migration path. We are working with the envoy team to take [stewardship][protoc-gen-validate-ownership] of
protoc-gen-validate. Supporting the generated SDKs workflow is a primary goal. In the meantime, continue to use the
template or switch to local generation using [`buf generate`][buf-generate].

## BSR npm registry

### Base URL

The base URL for the BSR npm registry has changed, you'll want to update your `.npmrc`:

```diff
- @buf:registry=https://npm.buf.build
+ @buf:registry=https://buf.build/gen/npm/v1
```

### Naming convention

The naming convention has changed because templates have been removed in favor of plugins. The new format is:

`{moduleOwner}_{moduleName}.{pluginOwner}_{pluginName}`

Note the dot (`.`) delimiter is used to break up the module and the plugin components.

This means you'll need to do 2 things:

1. `npm remove` the old package and `npm install` the new package
1. Search and replace application imports

```diff
- npm install @buf/bufbuild_es_bufbuild_eliza
+ npm install @buf/bufbuild_eliza.library_protobuf-es
```

New documentation is available at [NPM registry][npm-registry].

### connect-web template

If you consumed [connect-web template][bsr-template-connect-web] you'll need to update all imports for **base types**
within your application code. This plugin now outputs plugin dependencies, namely [protobuf-es][protobuf-es], into a
separate package.

<details>
  <summary>Show example</summary>
  <div>

### One package (old behavior)

```diff
- node_modules
- └── @buf
-     └── bufbuild_connect-web_bufbuild_eliza
-         ├── buf
-         │   └── connect
-         │       └── demo
-         │           └── eliza
-         │               └── v1
-         │                   ├── eliza_connectweb.d.ts
-         │                   ├── eliza_connectweb.js
-         │                   ├── eliza_pb.d.ts
-         │                   └── eliza_pb.js
-         └── package.json
```

### Two packages (new behavior)

```diff
+ node_modules
+ └── @buf
+     ├── bufbuild_eliza.library_connect-web
+     │   ├── buf
+     │   │   └── connect
+     │   │       └── demo
+     │   │           └── eliza
+     │   │               └── v1
+     │   │                   ├── eliza_connectweb.d.ts
+     │   │                   └── eliza_connectweb.js
+     │   └── package.json
+     └── bufbuild_eliza.library_protobuf-es
+         ├── buf
+         │   └── connect
+         │       └── demo
+         │           └── eliza
+         │               └── v1
+         │                   ├── eliza_pb.d.ts
+         │                   └── eliza_pb.js
+         └── package.json
```

  </div>
</details>


Using this example, if your application code imported `eliza_pb.js`
from `@buf/bufbuild_connect-web_bufbuild_eliza/eliza_connectweb.js` then you'll want to update that import within your
application code to reference the base types from `@buf/bufbuild_eliza.library_protobuf-es/eliza_connectweb.js`.
Assuming you have `npm uninstall` and `npm install` based on the naming change mentioned above.

### protocolbuffers/js and grpc/web templates

If you were using the [`protocolbuffers_js`][template-protocolbuffers-js] or [`grpc_web`][template-grpc-web] templates
there is no equivalent in the new BSR npm registry.

The plugins themselves are still hosted on the BSR and can be used with `buf generate` commands.

- https://buf.build/library/js
- https://buf.build/library/grpc-web

[bsr-hosted-plugins]: docs/generate/remote-generation.md

[bsr-plugins]: https://buf.build/plugins

[bsr-plugin-connect-go]: https://buf.build/plugins/connect-go

[bsr-plugin-go]: https://buf.build/plugins/go

[bsr-plugin-grpc-go]: https://buf.build/plugins/grpc-go

[bsr-template-connect-go]: https://buf.build/bufbuild/templates/connect-go

[bsr-template-connect-web]: https://buf.build/bufbuild/templates/connect-web

[bsr-template-grpc-go]: https://buf.build/grpc/templates/go

[bufbuild-plugins]: https://github.com/bufbuild/plugins

[bufbuild-plugins-issue]: https://github.com/bufbuild/plugins/issues/new/choose

[buf-generate]: docs/generate/usage.mdx

[buf-tag-18]: https://github.com/bufbuild/buf/releases/tag/v1.8.0

[go]: go

[npm-registry]: npm-registry

[protobuf-es]: https://www.npmjs.com/package/@bufbuild/protoc-gen-es

[protoc-gen-validate]: https://github.com/envoyproxy/protoc-gen-validate

[protoc-gen-validate-ownership]: https://github.com/envoyproxy/protoc-gen-validate/issues/616

[template-grpc-web]: https://buf.build/grpc/templates/web

[template-protocolbuffers-js]: https://buf.build/protocolbuffers/templates/js

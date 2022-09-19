---
id: migration-guide
title: Migration guide
---

# Remote generation migration guide

Several changes have been made to the plugins hosted on the BSR and the remote generation features. This guide walks you through the changes and exactly what you need to update.


## Disable plugin uploads

You will no longer be able to upload plugins or create templates based on those plugins.

For now, the Buf team will package and distribute plugins to the BSR, browsable at [buf.build/plugins][bsr-plugins]. To learn more about how plugins are packaged and distributed check out the [bufbuild/plugins repository][bufbuild-plugins]. 

If you find a useful plugin that should be added please [file an issue][bufbuild-plugins-issue]!

:::info What happens to the old plugins and templates?

Existing plugins and templates will remain available, but will be removed at a later date. We take breaking changes very seriously and want to provide ample opportunity for our valued users to migrate and request plugins which have not yet been added.

:::

## Templates removed

Templates were yet another concept for users to understand when interacting with the BSR, so we removed them. Instead, you reference plugins directly by name. A list of plugins can be found at:

https://buf.build/plugins

All hosted plugins can be used as `plugin` references in `buf.gen.yaml` files.

Some plugins can be used with the BSR go proxy and BSR npm registry.

### Versioning

The synthetic versioning scheme has been replaced by a more explicit versioning scheme which is comprised of the plugin version, module reference (datetime+short commit name) and revision.

This new versioning scheme is semver-compatible and ensures the versions can be pinned in lock files  and always reference a specific plugin + module for reproducibility.

Most users will be fetching `@latest` and will be unaffected by the versioning change.

## buf.gen.yaml

The buf.gen.yaml configuration file is largely unchanged, except for:

1. `name` and `remote` keys to reference plugins changed to just `plugin`. The `plugin` key understands both local and remote references. Requires [buf CLI version 1.8][buf-tag-18] or later.

1. Drop the `../plugins/..` path when referencing hosted plugins

Full example covering both changes:

```diff
plugins:
-  - remote: buf.build/bufbuild/plugins/connect-go
+  - plugin: buf.build/library/connect-go
```

## Go proxy

...

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

If you consumed [connect-web template][bsr-template-connect-web] you'll need to update all imports for **base types** within your application code. This plugin now outputs plugin dependencies, namely [protobuf-es][protobuf-es], into a separate package.

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


Using this example, if your application code imported `eliza_pb.js` from `@buf/bufbuild_connect-web_bufbuild_eliza/eliza_connectweb.js` then you'll want to update that import within your appliction code to reference the base types from `@buf/bufbuild_eliza.library_protobuf-es/eliza_connectweb.js`. Assuming you have `npm uninstall` and `npm install` based on the naming change mentioned above.



[bsr-plugins]: https://buf.build/plugins
[bsr-template-connect-web]: https://buf.build/bufbuild/templates/connect-web
[bufbuild-plugins]: https://github.com/bufbuild/plugins
[bufbuild-plugins-issue]: https://github.com/bufbuild/plugins/issues/new/choose
[buf-tag-18]: https://github.com/bufbuild/buf/releases/tag/v1.8.0
[npm-registry]: /bsr/remote-generation/npm-registry
[protobuf-es]: https://www.npmjs.com/package/@bufbuild/protoc-gen-es

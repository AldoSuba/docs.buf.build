---
id: explanation
title: Remote Packages
description: "Unlock the secrets of remote packages with this comprehensive guide that includes building context, understanding the fundamentals and effective implementation in your workflow."
---

:::danger 🚧 Construction Notes

This EXPLANATION oriented to understanding must explain & build context. Its form, discursive explanation. Analogous an
article on culinary social history.

:::

import { Card, Cards } from "@site/src/components/Cards";

<Cards>
  <Card
    name="🖌 Tutorial"
    url="../../tutorials/getting-started/getting-started-with-bsr"
    description="Are you ready to elevate your schema management game and streamline your development process?"
  />
  <Card
    name="🚧 How To"
    url="how-to"
    description="Streamline Your Development: Learn how to seamlessly migrate to remote packages and take your development process to the next level."
  />
  <Card
    name="🧱 Reference"
    url="reference/overview"
    description="Unlock the Secrets of Remote Packages: Dive deep into the world of remote packages and discover the many benefits they offer in this comprehensive guide."
  />
  <Card
    name="🏗 Explanation"
    url="explanation"
    description="Unlock the power of remote packages and boost your productivity with our comprehensive guide, which covers understanding, building context, and implementing them in your workflow."
  />
</Cards>

Protobuf is a fantastic way to programmatically define your APIs and generate away
a lot of the common work we perform as software engineers to communicate across
our services. Here at Buf, we believe the eventual promise of Protobuf is for
us to stop publishing English-language API specs, and instead move to generated
SDKs that we all consume.

Remote packages is the movement towards this promise. With remote packages,
Buf will take your [modules][modules] and Protobuf plugins, add a little elbow
grease, and generate full-serve packages for you to consume just like any
third-party library in your native programming language. This means you
don't have to worry about Protobuf code generation at all -
you can push [modules][modules] to the BSR and install code stubs generated
from those modules using dependency management tools like [npm](npm.mdx)
and [go](go.mdx).

**Go**

```
# Get the Connect client and server packages for the buf.build/bufbuild/eliza module
$ go get buf.build/gen/go/bufbuild/eliza/bufbuild/connect-go
```

**NPM**

```
# Install the Connect client packages for the buf.build/bufbuild/eliza module
$ npm config set @buf:registry https://buf.build/gen/npm/v1
$ npm install @buf/bufbuild_eliza.bufbuild_connect-web
```

- Zero tooling to install: forget about plugins or Protobuf compilers entirely.
- API producers can provide two lines of installation instructions instead of publishing their own SDKs.
- No need to keep plugins and supporting library versions in sync.
- Dependabot and other tools pick up version changes.
- Any organization-wide caching used for your existing programming languages
  can be used in the exact same way.

## Supported languages

The BSR currently supports Remote Packages for these languages:

import BsrLanguages from "@site/src/components/BsrLanguages";

<BsrLanguages/>

We plan to support Remote Packages for additional languages in the near future, including
(in rough priority order):

- Python
- Java
- Swift
- C#
- Ruby

[modules]: /bsr/overview#modules

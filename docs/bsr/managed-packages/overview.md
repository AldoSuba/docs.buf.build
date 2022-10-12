---
id: overview
title: Overview
---

:::note
The alpha [Overview documentation](../../reference/deprecated/remote-generation/overview.mdx) has moved to the Reference
section.
:::

With Managed Packages you no longer have to concern yourself with code generation. Instead, the BSR automatically
generates code, so it’s available like any other dependency, which means you can push Buf modules to the BSR and install
code stubs generated from those modules using dependency management tools like npm and go.

- Zero tooling to install
- API producers can provide two lines of installation instructions instead of maintaining and publishing their own SDKs
- No need to keep plugins and supporting library versions in sync
- Dependabot and other tools pick up version changes

## Hosted Plugins

The BSR currently supports Managed Packages for these languages:

import BsrLanguages from "@site/src/components/BsrLanguages";

<BsrLanguages />

We plan to support Managed Packages for additional languages in the near future.

## Concepts

We’ve long said that API design is stuck in the past, our mission has always been solve the freeform addicted
development lifecycle and return the time usually wasted plugging systems together back to the engineering team so they
can focus on writing business logic and build better user experiences for their customers. We believe Managed Packages is
a big step forward in making this vision a reality.

Using Protocol Buffers as a technology-neutral language is the solution to
a [schema driven development future](https://buf.build/blog/api-design-is-stuck-in-the-past#the-opportunity-for-schema-driven-development)
, the ecosystem surrounding the technology is incomplete and results in teams all around the world expensing efforts in
solving the exact same problems.

A common frustration working with Protocol Buffers is generating code, it can be difficult to ensure every person has
all the code generation machinery set up locally. Many teams implement custom, sophisticated tooling and processes to
solve this problem. This often times requires a set of large and unsightly build scripts which increase the barrier of
entry to new employees and demands a reasonably skilled dedicated team to maintain.

Furthermore, clients interfacing with a Protobuf-based API just want a library without the nuances of code generation.

Ultimately, the development has just shifted from the overhead involved with hand-crafting APIs and integration to that
of maintaining the proto definitions and subsequent generation & publishing tasks. Whilst arguably a smaller overhead,
an overhead nonetheless.

With the Buf Schema Registry’s Managed Packages feature, development teams can simply write and publish the protobuf
definitions and Buf will take care of the rest. Server and Client-side libraries will be generated and served by the
Schema Registry for application teams to depend on in their chosen package management system.

The Buf Schema Registry is the perfect place for personal projects, tiny startups, and giant mega-corporations alike.
Where an API marketplace can increase discoverability of your service, provide documentation to potential consumers and
expose client libraries to ensure a perfect connection every time.

With remote code generation plugins are executed *on the BSR itself*—not on your laptop, not in a CI/CD environment,
only remotely on the BSR.




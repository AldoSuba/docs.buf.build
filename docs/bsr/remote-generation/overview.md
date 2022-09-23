---
id: overview
title: Overview
---

:::note

The existing alpha remote generation [Overview documentation](../../reference/deprecated/remote-generation/overview.md) has moved to the Reference section.

:::

# Overview

A common frustration working with Protocol Buffers is generating code. Many teams implement custom tooling and processes to solve this problem, but it can be difficult to ensure every person has all of the code generation machinery set up locally.

Furthermore, clients interfacing with a Protobuf-based API just want an SDK client without the nuances of code generation.

To propel the Protobuf ecosystem forward and simplify code generation workflows, the Buf team packages and publishes `protoc-` based plugins to the BSR and makes them available for all.

With remote code generation plugins are executed _on the BSR itself_&mdash;not on your laptop, not in a CI/CD environment, only remotely on the BSR.

## Remote plugin execution

This feature enables you to generate code stubs locally with `buf generate` without needing to install plugins.
This provides consistent build output across developer and CI builds and removes the need to install additional plugin dependencies (language runtimes, build tools, and runtime dependencies).
Additionally, the Buf team keeps protoc plugins up to date with the latest versions, performs validation of each plugin, and runs code generation in a restricted environment (minimizing potential security risks of local plugin execution).

## Generated SDKs

With generated SDKs you no longer have to concern yourself with code generation. Instead, the **BSR makes already generated code available like any other dependency**, which means you can push Buf modules to the BSR and install code stubs generated from those modules using dependency management tools like `npm` and `go`.

- Zero tooling to install
- API producers can provide two lines of installation instructions instead of maintaining and publishing their own SDKs
- No need to keep plugins and supporting library versions in sync
- Dependabot and other tools pick up version changes

The BSR currently supports generated SDKs for these languages:

import BsrLanguages from "@site/src/components/BsrLanguages";

<BsrLanguages />

We plan to support generated SDKs for additional languages in the near future.

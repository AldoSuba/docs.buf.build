---
id: overview
title: Overview
description: The BSR offers generated assets, which means you fetch generated source code like any other dependency.
---

# Overview

A common frustration working with Protocol Buffers is that you need to generate code. Many teams implement custom tooling and processes to solve this problem, but it can be difficult to ensure every person who works on a given project has all of the code generation tooling set up locally.

Furthermore, if you're a consumer of a Protobuf-based API, then you shouldn't even have to deal with Protobuf or the nuances of code generation.

The Buf Schema Registry solves this problem with **generated assets** available for download through the **BSR Go Module Proxy** and **BSR NPM Registry**. With this feature, you eliminate code generation workflows and directly install code generated from Protobuf definitions using standard package managers and build tools.

All code generation happens _on the BSR itself_&mdash;not on your laptop, not in a CI/CD environment, only remotely on the BSR.

:::success Hosted plugin execution
A feature that you may also find useful is [hosted plugin execution](../hosted-plugins.md). While **generated assets** is geared toward eliminating the need to directly generate code stubs _at all_, hosted plugin execution enables you to generate code stubs locally without needing to install plugins.
:::

## Supported languages {#languages}

The BSR currently supports generated assets for these languages:

import BsrLanguages from "@site/src/components/BsrLanguages";

<BsrLanguages />

We plan to support generated assets for additional languages in the near future.

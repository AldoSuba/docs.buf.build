---
sidebar_position: 5
id: configure-ci-cd
title: Configure CI/CD
description: "Transform Your Go API Building Game with Buf: Create Lightning-Fast, Efficient, and Effortless APIs in
Just 15 Minutes!"
---

GitHub Actions is a CI/CD system supported by GitHub that runs workflows against your code based on an event. Buf has
published a collection of GitHub Actions that work together to provide a fully featured CI/CD solution for Protobuf:

* `buf-setup` installs and sets up buf, so that it can be used by other steps.
* `buf-lint` lints Protobuf files with buf, and comments in-line on pull requests.
* `buf-breaking` verifies backwards compatibility for your Protobuf files with buf, and comments in-line on pull requests.
* `buf-push` pushes a module to the Buf Schema Registry (BSR). The module is pushed with a tag equal to the git commit SHA.

In this guide, you will configure these GitHub Actions so that buf lint and buf breaking are run on all pull requests,
and buf push pushes your module to the BSR when your pull request is merged.

## Prerequisites

## Install tools

import Feedback from './_feedback.mdx';

<Feedback/>

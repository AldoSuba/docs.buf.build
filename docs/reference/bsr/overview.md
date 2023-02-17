---
id: overview
title: Overview
sidebar_position: 1
---

## Repository

A Buf Schema Registry (BSR) repository is a collection of Buf modules that have been published to the BSR. BSR helps
with managing modifications to protobufs by tracking file changes over time and offering collaboration tools like
breaking change detection and remote packages.

Developers can access the repository by using buf commands, which allows them to perform tasks such as creating remote
repositories, pushing changes to files, and creating tags and drafts. All in all, a BSR repository offers API producers
and consumers a powerful and adaptable method for Schema Driven Development and keeping track of modifications over
time.

## Module

Modules are the fundamental primitive of Buf and the BSR. A module is a group of configured, built, and versioned
Protobuf files that form a logical unit. When you initiate a `buf.yaml`, you create a module.

A module can have various versions, each including any number of changes, and each modification is identifiable by a
unique **commit**, **tag**, or **draft**. The complete set of module versions is stored within a repository.

- **Commit**: A commit is associated with each push of new content to a repository and identifies the change in the
  schema. The commit is created after a successful push, which means that, unlike Git, the commit only exists on the BSR
  repository and not locally.

- **Tag**: A tag refers to a single commit but has a human-readable name, similar to a Git tag. It is beneficial for
  identifying frequently referenced commits, like a release.

- **Draft**: A draft is a temporary commit in a development workflow that has a human-readable name, similar to a Git
  feature branch but without a history. It is useful for iterating on a module while keeping those changes outside the
  primary branch. It can be overwritten and deleted. When used as a dependency in buf.yaml of a module, the module
  cannot be pushed until updated to a non-draft commit of the dependency.

## Summary

A repository stores a module that has different versions, where each version is identified by a commit, tag, and/or
draft. Unlike Git repositories, a BSR repository is only a remote location, and there is no concept of a repository "
clone" Therefore, repositories do not exist in multiple locations.



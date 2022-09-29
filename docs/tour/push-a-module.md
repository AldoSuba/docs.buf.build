---
id: push-a-module
title: 7 Push a module
---

Now that you've authenticated with the [BSR](../bsr/overview.md), you can create and push a [BSR module](../bsr/overview.md#modules) that defines the
`PetStoreService` API.

## 7.1 Terminology {#terminology}

Before we continue, it's important that we cover some basic terminology.

### 7.1.1 Modules {#modules}

**Modules** are the core primitive of Buf and the BSR. A module is a collection of Protobuf
files that are configured, built, and versioned as a logical unit.

There are two kinds of modules which are related

#### 7.1.1 BSR Modules {#bsr-modules}

A BSR Module is a module that has been pushed to the BSR. A module on the BSR contains `tracks` which are similar to a branch of a tree of which there can be multiple but every BSR module has an implicit `main` track.


#### 7.1.1 Non BSR Modules {#non-bsr-modules}

Any module that exists outside the BSR does not have the concepts of `snapshots` or `tracks` and is just an isolated non versioned instance of the larger connected BSR module.

While roughly analogous to Git repositories, a BSR module is only a remote location - there is no concept of a repository "clone". In other words, modules do not exist in multiple locations.

### 7.1.3 BSR name {#bsr-names}

A bsr name consists of three components:

  - **Remote**: The DNS name for the server hosting the BSR, such as `buf.build`.
  - **Owner**: The user or organization that owns the BSR module.
  - **Name**: The module's name.

Some example module names broken down into components:

BSR Name | Remote | Owner | Name
:----|:-------|:------|:----------
`buf.build/alice/tools` | `buf.build` | `alice` | `tools`
`buf.build/acme/weather` | `buf.build` | `acme` | `weather`
`my-private-bsr.io/omnicorp/biz` | `my-private-bsr.io` | `omnicorp` | `biz`


## 7.2 Create a module {#create-a-module}

Create a new `petapis` BSR module with this command:

```terminal
$ buf beta registry module create buf.build/$BUF_USER/petapis --visibility public
---
Full name                    Created
buf.build/$BUF_USER/petapis  ...
```

## 7.3 Link to the BSR module {#link-modules}

Move back into the `petapis` directory:

```terminal
$ cd petapis
```

Update your `buf.yaml` so that its `name` matches the BSR name:

```yaml title="buf.yaml" {2}
 version: v1
+name: buf.build/$BUF_USER/petapis
 lint:
   use:
     - DEFAULT
 breaking:
   use:
     - FILE
```

## 7.4 Push the module {#push-the-module}

Push the module to the `buf.build/$BUF_USER/petapis` module with this command (in the
`petapis` directory containing your `buf.yaml`):

```terminal
$ buf push
---
19bcefa1a736428d9e64d21c9191b213
```

Behind the scenes, `buf` recognizes the `name` in your `buf.yaml` and pushes the module to `buf.build/$BUF_USER/petapis`. If successful, the generated snapshot identifies this current version of your module.

> The snapshot you see differs from the one shown here.

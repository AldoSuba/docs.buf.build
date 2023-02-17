---
id: documentation
title: Documentation
sidebar_position: 2
---

## Overview

The Buf Schema Registry (BSR) provides an automatic documentation generation feature for Protobuf APIs. Documentation is
an essential tool that can increase developer productivity at all stages of the software development process. However,
when separated from code, it can become a maintenance burden. The beauty of generated documentation is that it overcomes
this problem.

Once a module is pushed to the BSR, we automatically generate comprehensive documentation for the module, which is
displayed in the recently redesigned BSR interface, making it easy for consumers to find. Refer to our earlier blog post
for more information on how to document APIs in Protobuf source code.

## Prerequisites (optional)

    1. Before breaking down the feature/concept and diving into each one, if there are any other features/concepts the
       reader should be familiar with first, they should be linked here
    2. This is optional and should be used to help set the reader/user up for success on the rest of the page

### Sub-feature/concept breakdown

    1. For each sub-feature/concept, describe what each one is/does
    2. Include clearly any code snippets that might help describe each sub-feature/concept
    3. Link out to any how-tos as needed
    4. Link out to examples in the BSR as needed

## Modules

Most documentation comes directly from comments associated with your Protobuf definitions. But there also needs to be a
way for authors to _describe their module_ for others to understand its functionality.

To accomplish this, you add a `buf.md` file to the same directory as your module's `buf.yaml` file and push it to the
BSR like normal. Since documentation is part of your module, any updates to your `buf.md` result in new commits in the
BSR.

The `buf.md` file is analogous to a GitHub repository's `README.md` and currently supports all
the [CommonMark](https://commonmark.org) syntax.

:::tip Add your readme
It may be useful to publish the same `README` you use in `git` to the BSR, simply use a symlink between the `README.md`
and your `buf.md`.

```shell
ln buf.md README.md
```

We do this in [`bufbuild/reflect`](https://buf.build/bufbuild/reflect)
:::

## Packages

The package level documentation provides Protobuf type definitions and comments for all package files. Clicking through
the type definitions takes you to the referenced item. You can quickly navigate from the docs to the Protobuf file by
clicking the filename on the right-hand side. Each type definition has a unique placeholder within the page, an anchor
tag, enabling you to share links to the exact item.

:::tip Publish a license

Just like `buf.md`, you can publish a `LICENSE` file to the BSR. Simply add a file with the name `LICENSE` as a sibling
of a `buf.yaml` and `buf push`.

:::

## Options

Protobuf options are annotations that can be added to elements in Protobuf source files to control various aspects of
how they are handled. For instance, they can change how data is serialized, mark types or fields as deprecated, and
alias enum cases. To learn more about how options work, refer to the Protobuf Language Guide.

BSR Generated Documentation supports a limited selection of Protobuf options to convey critical information to
consumers. At present, we have restricted the rendering of options to the following supported list:

<div class="row">
<div class="col col--4">

#### Message options

- `deprecated`

#### Field options

- `deprecated`
- `packed`
- `ctype`
- `jstype`

</div>

<div class="col col--4">

#### Enum options

- `allow_alias`
- `deprecated`

#### EnumValue options

- `deprecated`

</div>
<div class="col col--4">


#### Service options

- `deprecated`

#### Method options

- `deprecated`
- `idempotency_level`

</div>
</div>

## Conclusion


    1. Summarize all the things and provide closing remarks
    2. (Optional) Link out to how-tos for the readers/users to apply their newfound knowledge












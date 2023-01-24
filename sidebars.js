// @ts-check

const sidebars = {
  docs: [
    "introduction",
    "installation",
    {
      type: "category",
      label: "The Buf CLI",
      items: [
        { type: "doc", label: "Breaking", id: "buf/breaking/buf-breaking-explanation" },
        { type: "doc", label: "Build", id: "buf/build/buf-build-explanation" },
        { type: "doc", label: "Convert", id: "buf/convert/buf-convert-explanation" },
        { type: "doc", label: "Curl", id: "buf/curl/buf-curl-explanation" },
        { type: "doc", label: "Export", id: "buf/export/buf-export-explanation" },
        { type: "doc", label: "Format", id: "buf/format/buf-format-explanation" },
        { type: "category", label: "Generate", items: ["buf/generate/buf-generate-explanation", "buf/generate/buf-managed-mode-reference"] },
        { type: "doc", label: "Lint", id: "buf/lint/buf-lint-explanation" },
        { type: "doc", label: "Mod", id: "buf/mod/buf-mod-explanation" },
        { type: "doc", label: "Push", id: "buf/push/buf-push-explanation" },
        { type: "doc", label: "Registry", id: "buf/registry/buf-registry-explanation" }
      ],
      collapsed: false
    },
    {
      type: "category",
      label: "The Buf Schema Registry (BSR)",
      items: [
        { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/bsr-dependency-management-explanation" },
        { type: "doc", label: "Documentation", id: "bsr/documentation/bsr-documentation-explanation" },
        { type: "doc", label: "Remote Packages", id: "bsr/remote-packages/bsr-remote-packages-explanation" },
        { type: "doc", label: "Remote Plugins", id: "bsr/remote-plugins/bsr-remote-plugins-explanation" },
        { type: "doc", label: "Schema Management", id: "bsr/schema-management/bsr-schema-management-explanation" },
        { type: "doc", label: "Studio", id: "bsr/studio/bsr-studio-explanation" },
        { type: "doc", label: "User Management", id: "bsr/user-management/bsr-user-management-explanation" },
      ],
      collapsed: false
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-buf",
          label: "Getting started with Buf",
        },
        {
          type: "doc",
          id: "tutorials/going-further/going-further-with-buf",
          label: "Going further with Buf",
        },
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-bsr",
          label: "Getting started with the BSR",
        },
        "tutorials/getting-started/getting-started-with-buf-studio",
      ],
      collapsed: false
    },
    {
      type: "category",
      label: "How To",
      items: [
        "how-to/how-to-use-buf-in-your-js-project",
        "how-to/build-an-api-client-with-buf",
        "how-to/replace-protoc-with-buf",
        "how-to/iterate-on-modules",
        "how-to/migrate-from-protolock",
        "how-to/migrate-from-prototool",
        { type: "doc", label: "Buf Breaking", id: "buf/breaking/buf-breaking-explanation" },
        { type: "doc", label: "Buf Breaking", id: "buf/breaking/buf-breaking-explanation" },
      ],
      collapsed: false
    },
    {
      type: "category",
      label: "Reference",
      items: [
        {
          type: "category",
          label: "The Buf CLI",
          items: [
            { type: "doc", label: "Breaking", id: "buf/breaking/buf-breaking-reference" },
            { type: "doc", label: "Build", id: "buf/build/buf-build-reference" },
            { type: "doc", label: "Convert", id: "buf/convert/buf-convert-reference" },
            { type: "doc", label: "Curl", id: "buf/curl/buf-curl-reference" },
            { type: "doc", label: "Export", id: "buf/export/buf-export-reference" },
            { type: "doc", label: "Format", id: "buf/format/buf-format-reference" },
            { type: "doc", label: "Generate", id: "buf/generate/buf-generate-reference" },
            { type: "doc", label: "Lint", id: "buf/lint/buf-lint-reference" },
            { type: "doc", label: "Mod", id: "buf/mod/buf-mod-reference" },
            { type: "doc", label: "Push", id: "buf/push/buf-push-reference" },
            { type: "doc", label: "Registry", id: "buf/registry/buf-registry-reference" }
          ],
          collapsed: true
        },
        {
          type: "category",
          label: "The Buf Schema Registry (BSR)",
          items: [
            { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/bsr-dependency-management-reference" },
            { type: "doc", label: "Documentation", id: "bsr/documentation/bsr-documentation-reference" },
            { type: "doc", label: "Remote Packages", id: "bsr/remote-packages/bsr-remote-packages-reference" },
            { type: "doc", label: "Remote Plugins", id: "bsr/remote-plugins/bsr-remote-plugins-reference" },
            { type: "doc", label: "Schema Management", id: "bsr/schema-management/bsr-schema-management-reference" },
            { type: "doc", label: "Studio", id: "bsr/studio/bsr-studio-reference" },
            { type: "doc", label: "User Management", id: "bsr/user-management/bsr-user-management-reference" },
          ],
          collapsed: true
        },
      ],
      collapsed: false
    }

  ]
};

module.exports = sidebars;

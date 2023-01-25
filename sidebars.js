// @ts-check

const sidebars = {
  docs: [
    "introduction",
    "installation",
    {
      type: "category",
      label: "The Buf CLI",
      items: [
        { type: "doc", label: "Breaking", id: "buf/breaking/explanation" },
        { type: "doc", label: "Build", id: "buf/build/explanation" },
        { type: "doc", label: "Convert", id: "buf/convert/explanation" },
        { type: "doc", label: "Curl", id: "buf/curl/explanation" },
        { type: "doc", label: "Export", id: "buf/export/explanation" },
        { type: "doc", label: "Format", id: "buf/format/explanation" },
        { type: "doc", label: "Generate", id: "buf/generate/explanation" },
        { type: "doc", label: "Lint", id: "buf/lint/explanation" },
        { type: "doc", label: "Mod", id: "buf/mod/explanation" },
        { type: "doc", label: "Push", id: "buf/push/explanation" },
        { type: "doc", label: "Registry", id: "buf/registry/explanation" }
      ],
      collapsed: false
    },
    {
      type: "category",
      label: "The Buf Schema Registry (BSR)",
      items: [
        { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/explanation" },
        { type: "doc", label: "Documentation", id: "bsr/documentation/explanation" },
        { type: "doc", label: "Remote Packages", id: "bsr/remote-packages/explanation" },
        { type: "doc", label: "Remote Plugins", id: "bsr/remote-plugins/explanation" },
        { type: "doc", label: "Schema Management", id: "bsr/schema-management/explanation" },
        { type: "doc", label: "Studio", id: "bsr/studio/explanation" },
        { type: "doc", label: "User Management", id: "bsr/user-management/explanation" }
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
          label: "Getting started with Buf"
        },
        {
          type: "doc",
          id: "tutorials/going-further/going-further-with-buf",
          label: "Going further with Buf"
        },
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-bsr",
          label: "Getting started with the BSR"
        },
        {
          type: "doc",
          id: "tutorials/going-further/going-further-with-bsr",
          label: "Going further with the BSR"
        },
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-buf-studio",
          label: "Getting Started with Buf Studio"
        }
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
        "buf/breaking/how-to",
        "buf/build/how-to",
        "buf/generate/how-to",
        "bsr/remote-packages/how-to",
        {
          type: "doc",
          id: "ci-cd/how-to",
          label: "Buf on GitHub Actions: A Setup Guide"
        }
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
            {
              type: "category",
              label: "Breaking",
              items: ["buf/breaking/reference/configuration", "buf/breaking/reference/rules"],
              collapsed: true
            },
            { type: "doc", label: "Build", id: "buf/build/reference" },
            { type: "doc", label: "Convert", id: "buf/convert/reference" },
            { type: "doc", label: "Curl", id: "buf/curl/reference" },
            { type: "doc", label: "Export", id: "buf/export/reference" },
            { type: "doc", label: "Format", id: "buf/format/reference" },
            {
              type: "category",
              label: "Generate",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "buf/generate/reference"
                },
                "buf/generate/managed-mode/reference"
              ]
            },
            { type: "doc", label: "Mod", id: "buf/mod/reference" },
            { type: "doc", label: "Push", id: "buf/push/reference" },
            { type: "doc", label: "Registry", id: "buf/registry/reference" }
          ],
          collapsed: true
        },
        {
          type: "category",
          label: "The Buf Schema Registry (BSR)",
          items: [
            { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/reference" },
            { type: "doc", label: "Documentation", id: "bsr/documentation/reference" },
            {
              type: "category",
              label: "Remote Packages",
              items: ["bsr/remote-packages/reference/overview", "bsr/remote-packages/reference/go", "bsr/remote-packages/reference/npm"]
            },
            { type: "doc", label: "Remote Plugins", id: "bsr/remote-plugins/reference" },
            { type: "doc", label: "Schema Management", id: "bsr/schema-management/reference" },
            { type: "doc", label: "Studio", id: "bsr/studio/reference" },
            { type: "doc", label: "User Management", id: "bsr/user-management/reference" }
          ],
          collapsed: true
        },
        "reference/workspaces",
        "reference/images",
        "reference/inputs",
        "reference/internal-compiler",
        "reference/protoc-plugins",
        {
          type: "category",
          label: "Deprecated",
          items: [
            {
              type: "category",
              label: "Remote generation",
              customProps: {
                badge: {
                  label: "alpha",
                  severity: "info"
                }
              },
              items: [
                "reference/deprecated/remote-generation/overview",
                "reference/deprecated/remote-generation/go",
                "reference/deprecated/remote-generation/js",
                "reference/deprecated/remote-generation/plugin-example",
                "reference/deprecated/remote-generation/template-example"
              ],
              collapsed: true
            }
          ],
          collapsed: true
        },
      ],
      collapsed: false
    }

  ]
};

module.exports = sidebars;

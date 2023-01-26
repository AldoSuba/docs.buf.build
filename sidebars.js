// @ts-check

const sidebars = {
  docs: [
    {
      type: "category",
      label: "Quick Start",
      items: [
        {
          type: "doc",
          id: "installation",
          label: "Buf CLI"
        },
        {
          type: "link",
          label: "Buf Schema Registry (BSR)",
          href: "https://buf.build/signup"
        },
        {
          type: "link",
          label: "Connect",
          href: "https://connect.build"
        }
      ]
    },
    {
      type: "category",
      label: "Manuals",
      items: [
        "manuals",
        {
          type: "category",
          label: "The Buf CLI",
          items: [
            {
              type: "category",
              label: "Breaking Change Detection",
              items: [
                { type: "doc", label: "Overview", id: "buf/breaking/explanation" },
                { type: "doc", label: "Configuration", id: "buf/breaking/configuration" },
                { type: "doc", label: "Rules", id: "buf/breaking/rules" }
              ],
              collapsed: true
            },
            {
              type: "category",
              label: "Build an image",
              items: ["buf/build/explanation", "buf/build/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Convert a message",
              items: ["buf/convert/explanation", "buf/convert/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Invoke an API with Buf cURL",
              items: ["buf/curl/explanation", "buf/curl/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Export proto files",
              items: ["buf/export/explanation", "buf/export/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Format proto files",
              items: ["buf/format/explanation", "buf/format/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Generate Code",
              items: ["buf/generate/explanation", "buf/generate/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Apply lint checks",
              items: ["buf/lint/explanation", "buf/lint/reference/overview", "buf/lint/reference/configuration", "buf/lint/reference/rules"],
              collapsed: true
            },
            {
              type: "category",
              label: "Create a Buf Module",
              items: ["buf/mod/explanation", "buf/mod/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Push a module to the BSR",
              items: ["buf/push/explanation", "buf/push/reference"],
              collapsed: true
            },
            {
              type: "category",
              label: "Interact with a Buf Registry",
              items: ["buf/registry/explanation", "buf/registry/reference"],
              collapsed: true
            },
            { type: "doc", label: "Understanding Inputs", id: "buf/other/inputs" },
            { type: "doc", label: "What is the Buf compiler?", id: "buf/other/internal-compiler" },
            { type: "doc", label: "Understanding protoc plugins", id: "buf/other/protoc-plugins" },
            { type: "doc", label: "Using a workspace", id: "buf/other/workspaces" },
            { type: "doc", label: "Use Buf with Bazel", id: "buf/other/bazel" }
          ],
          collapsed: false
        },
        {
          type: "category",
          label: "The Buf Schema Registry (BSR)",
          items: [
            "bsr/introduction",
            "bsr/explanation",
            { type: "doc", label: "Documentation", id: "bsr/documentation/explanation" },
            { type: "doc", label: "Authentication", id: "bsr/authentication/explanation" },
            { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/explanation" },
            { type: "doc", label: "Remote Packages", id: "bsr/remote-packages/explanation" },
            { type: "doc", label: "Remote Plugins", id: "bsr/remote-plugins/explanation" },
            { type: "doc", label: "Schema Management", id: "bsr/schema-management/explanation" },
            { type: "doc", label: "Studio", id: "bsr/studio/explanation" },
            { type: "doc", label: "User Management", id: "bsr/user-management/explanation" },
            { type: "category", label: "Data Model", items: ["bsr/data-model/images"], collapsed: false }
          ],
          collapsed: false
        }
      ]
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "tutorials/introduction",
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-buf",
          label: "Getting started with Buf"
        },
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-bsr",
          label: "Getting started with the BSR"
        },
        {
          type: "doc",
          id: "tutorials/getting-started/getting-started-with-buf-studio",
          label: "Getting Started with Buf Studio"
        },
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
        },
        {
          type: "category",
          label: "Best Practices",
          items: [
            "buf/best-practices/module-development",
            "buf/best-practices/style-guide"
          ],
          collapsed: true
        }
      ],
      collapsed: true
    },
    {
      type: "category",
      label: "Reference",
      items: [
        {
          type: "category",
          label: "The Buf CLI",
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "reference/buf"
            }
          ]
        },
        {
          type: "category",
          label: "Configuration",
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "configuration"
            }
          ]
        },
        {
          type: "category",
          label: "The Buf Schema Registry (BSR)",
          items: [
            "bsr/reference",
            { type: "doc", label: "Documentation", id: "bsr/documentation/reference" },
            { type: "doc", label: "Authentication", id: "bsr/authentication/reference" },
            { type: "doc", label: "Dependency Management", id: "bsr/dependency-management/reference" },
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
        }
      ]
    }
  ]
};

module.exports = sidebars;

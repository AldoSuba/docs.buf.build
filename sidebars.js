// @ts-check

const sidebars = {
        guides: [
            {
                type: "doc",
                label: "Get Buf",
                id: "installation",
                customProps: {
                    badge: {
                        label: "QUICK START",
                        severity: "info"
                    }
                }
            },
            "tutorials/getting-started-with-buf-cli",
            "tutorials/getting-started-with-bsr",
            {
                type: "category",
                label: "How To",
                items: [
                    "how-to/use-remote-packages",
                    "how-to/replace-protoc-with-buf",
                    "breaking/usage",
                    {
                        type: "doc",
                        id: "build/usage",
                        label: "Build a Buf Image",
                    },
                    "generate/usage",
                    "lint/usage",
                    "how-to/iterate-on-modules",
                    "how-to/migrate-from-protolock",
                    "how-to/migrate-from-prototool"
                ],
                collapsed: false
            },
            {
                type: "category",
                label: "Best Practices",
                items: [
                    "best-practices/style-guide",
                    "best-practices/module-development"
                ],
                collapsed: false
            },
            "about",
            "faq",
            "contact"
        ],
        manuals: [
            {
                type: "category",
                label: "The Buf CLI",
                items: [
                    "overview-cli",
                    {type: "doc", id: "build/explanation", label: "Explore Buf Images",},
                    {type: "doc", id: "generate/overview", label: "Generate Code",},
                    {type: "doc", id: "generate/managed-mode", label: "Standardize your file options",},
                    {type: "doc", id: "breaking/overview", label: "Breaking Change Detection"},
                    {type: "doc", id: "lint/overview", label: "Enforce Lint Standards"},
                    {type: "doc", id: "format/style", label: "Format your proto files"},
                    {
                        type: "doc",
                        label: "Invoke an API with Buf cURL",
                        id: "curl/usage",
                    },
                ],
                collapsed: false
            },
            {
                type: "category",
                label: "The Buf Schema Registry (BSR)",
                items: [
                    "bsr/introduction",
                    "bsr/overview",
                    "bsr/authentication",
                    "bsr/usage",
                    "bsr/api-access",
                    {
                        type: "category",
                        label: "Reflection",
                        items: [
                            "bsr/reflection/overview",
                            "bsr/reflection/usage",
                            "bsr/reflection/prototransform",
                        ],
                        collapsed: false
                    },
                    "bsr/documentation",
                    "bsr/user-management",
                    {
                        type: "doc",
                        id: "bsr/studio",
                        customProps: {
                            badge: {
                                label: "beta",
                                severity: "info"
                            }
                        }
                    },
                    {
                        type: "category",
                        label: "Remote Plugins",
                        items: [
                            "bsr/remote-plugins/overview",
                            "bsr/remote-plugins/usage",
                            "bsr/remote-plugins/migrating-from-alpha",
                        ],
                        collapsed: false
                    },
                    {
                        type: "category",
                        label: "Remote Packages",
                        items: [
                            "bsr/remote-packages/overview",
                            "bsr/remote-packages/go",
                            "bsr/remote-packages/npm",
                            "bsr/remote-packages/migrating-from-alpha"
                        ],
                        collapsed: false
                    }
                ],
                collapsed: false
            },
            {
                type: "category",
                label: "CI/CD",
                items: ["ci-cd/setup", "ci-cd/github-actions"],
                collapsed: false
            },
            {
                type: "category",
                label: "Build systems",
                items: ["build-systems/bazel"],
                collapsed: false
            },
        ],
        reference: [
            {
                type: "category",
                label: "Buf CLI",
                collapsed: false,
                items: [
                    {
                        type: 'autogenerated',
                        dirName: 'reference/buf',
                    },
                    {
                        type: "category",
                        label: "Configuration",
                        collapsed: false,
                        items: [
                            {type: "doc", label: "Breaking", id: "breaking/rules"},
                            {type: "doc", id: "lint/rules", label: "Lint"},
                        ]
                    },
                ]
            },

            {
                type: "category",
                label: "Configuration",
                items: [
                    "configuration/overview",
                    "configuration/v1beta1-migration-guide",
                    {
                        type: "category",
                        label: "v1",
                        items: [
                            "configuration/v1/buf-yaml",
                            "configuration/v1/buf-lock",
                            "configuration/v1/buf-gen-yaml",
                            "configuration/v1/buf-work-yaml"
                        ],
                        collapsed: false
                    },
                    {
                        type: "category",
                        label: "v1beta1",
                        items: [
                            "configuration/v1beta1/buf-yaml",
                            "configuration/v1beta1/buf-lock",
                            "configuration/v1beta1/buf-gen-yaml",
                            "configuration/v1beta1/lint-rules"
                        ],
                        collapsed: true
                    }
                ],
                collapsed: false
            },
            "editor-integration",
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
                        collapsed: false
                    }
                ],
                collapsed: true
            }
        ],
    }
;

module.exports = sidebars;

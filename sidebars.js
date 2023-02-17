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
            ],
            collapsed: false,
        },
        "about",
        "faq",
        "contact"
    ],
    guides: [
        {
            type: "category",
            label: "Guides",
            items: [
                "tutorials/getting-started-with-buf-cli",
                "tutorials/getting-started-with-bsr",
                {
                    type: "category",
                    label: "How To",
                    items: [
                        "how-to/replace-protoc-with-buf",
                        "breaking/usage",
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
            ],
            collapsed: false
        }
    ],
    manuals: [
        {
            type: "category",
            label: "Manuals",
            items: [
                {
                    type: "category",
                    label: "The Buf CLI",
                    items: [
                        "overview-cli",
                        {
                            type: "category",
                            label: "Explore Buf Images",
                            items: [
                                {
                                    type: "doc",
                                    id: "build/explanation",
                                    label: "Overview",
                                },
                                {
                                    type: "doc",
                                    id: "build/usage",
                                    label: "Configuration & Usage",
                                },
                            ],
                            collapsed: true
                        },
                        {
                            type: "category",
                            label: "Generate Code",
                            items: [
                                {
                                    type: "doc",
                                    id:  "generate/overview",
                                    label: "Overview",
                                },
                                {
                                    type: "doc",
                                    id:  "generate/managed-mode",
                                    label: "Standardize your file options",
                                },
                            ],
                            collapsed: true
                        },
                        {
                            type: "category",
                            label: "Breaking Change Detection",
                            items: [
                                "breaking/overview",
                                "breaking/configuration",
                                "breaking/rules"
                            ],
                            collapsed: true
                        },
                        {
                            type: "category",
                            label: "Format & Lint proto files",
                            items: [
                                { type: "doc", id:"lint/overview",label: "Overview"},
                                { type: "doc", id:"lint/configuration",label: "Configuration"},
                                { type: "doc", id:"lint/rules",label: "Rules"},
                                { type: "doc", id:"format/usage",label: "Enforce Consistency with Format"},
                                { type: "doc", id:"format/style",label: "Style Guide"},
                            ],
                            collapsed: true
                        },
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
            collapsed: false
        }
    ],
    reference: [
        {
            type: "category",
            label: "Reference",
            items: [
                {
                    type: "category",
                    label: "Buf CLI",
                    collapsed: false,
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference/buf',
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
            collapsed: false
        },
    ],
};

module.exports = sidebars;

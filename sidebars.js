// @ts-check

const sidebars = {
    docs: [
        "introduction",
        "installation",
        {
            type: "category",
            label: "Tour",
            items: [
                "tour/introduction",
                "tour/configure-and-build",
                "tour/list-all-protobuf-files",
                "tour/lint-your-api",
                "tour/detect-breaking-changes",
                "tour/generate-code",
                "tour/log-into-the-bsr",
                "tour/push-a-module",
                "tour/view-generated-documentation",
                "tour/add-a-dependency",
                "tour/generate-go-code",
                "tour/implement-grpc-endpoints",
                "tour/use-a-workspace",
                "tour/use-managed-mode",
                "tour/push-workspace-modules",
                {
                    type: "doc",
                    id: "tour/use-remote-packages",
                    customProps: {
                        badge: {
                            label: "new",
                            severity: "info"
                        }
                    }
                },
                "tour/wrapping-up",
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Build",
            items: ["build/usage"],
            collapsed: false
        },
        {
            type: "category",
            label: "Generate",
            items: [
                "generate/usage",
                "generate/managed-mode",
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Lint",
            items: [
                "lint/overview",
                "lint/usage",
                "lint/configuration",
                "lint/rules"
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Breaking Change Detection",
            items: [
                "breaking/overview",
                "breaking/usage",
                "breaking/configuration",
                "breaking/rules"
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Format",
            items: ["format/usage", "format/style"],
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
                    customProps: {
                        badge: {
                            label: "new",
                            severity: "info"
                        }
                    },
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
                    customProps: {
                        badge: {
                            label: "new",
                            severity: "info"
                        }
                    },
                    collapsed: false
                }
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
        {
            type: "category",
            label: "How To",
            items: [
                "how-to/replace-protoc-with-buf",
                "how-to/iterate-on-modules",
                "how-to/grpc",
                "how-to/migrate-from-protolock",
                "how-to/migrate-from-prototool"
            ],
            collapsed: false
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
        {
            type: "category",
            label: "Reference",
            items: [
                "reference/workspaces",
                "reference/images",
                "reference/inputs",
                "reference/internal-compiler",
                "reference/protoc-plugins",
                {
                    type: "category",
                    label: "buf cli",
                    collapsed: true,
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference/buf', // Generate sidebar slice from docs/tutorials/easy
                        },
                    ]
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
                    collapsed: false
                }
            ],
            collapsed: false
        },
        "editor-integration",
        "roadmap",
        "faq",
        "contact"
    ]
};

module.exports = sidebars;

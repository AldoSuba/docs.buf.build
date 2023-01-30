SHELL := /usr/bin/env bash -o pipefail
BIN := .tmp/bin
GO ?= go
UNAME_OS := $(shell uname -s)

ifeq ($(UNAME_OS),Darwin)
SED_I := sed -i ''
else
SED_I := sed -i
endif

.DEFAULT_GOAL := all

.PHONY: all
all: run

.PHONY: install
install:
	npm install

.PHONY: build
build: install
	rm -rf build
	npm run build

.PHONY: serve
serve: build
	npm run serve

.PHONY: start
start:
	npm run start

.PHONY: run
run: install
	npm run start

.PHONY: update
upgrade:
	npm update

.PHONY: clean
clean:
	git clean -xdf

.PHONY: lint
lint:
	vale docs

.PHONY: ci
ci:
	npm run build:ci

.PHONY: updateversion
updateversion: generate-reference
ifndef VERSION
	$(error "VERSION must be set")
endif
	$(SED_I) "s/[0-9].[0-9][0-9]*\.[0-9][0-9]*/$(VERSION)/g" docs/installation.md
	$(SED_I) "s/version: \"[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/version: \"$(VERSION)\"/g" docs/ci-cd/reference.md
	$(SED_I) "s/version = \"v[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/version = \"v$(VERSION)\"/g" docs/buf/other/bazel.md
	$(SED_I) "s/BUF_VERSION=[0-9].[0-9][0-9]*\.[0-9][0-9]*/BUF_VERSION=$(VERSION)/g" docs/ci-cd/how-to.mdx
	$(SED_I) "s/downloadRelease: \"[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/downloadRelease: \"$(VERSION)\"/g" docusaurus.config.js

.PHONY: generate-reference
generate-reference: $(BIN)/doc
	./$(BIN)/doc
	@make reference-hack

$(BIN)/doc: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(@D)) $(GO) install github.com/bufbuild/buf/cmd/buf/doc@v$(VERSION)

.PHONY: reference-hack
reference-hack:
	find docs/reference -name "*.md" -exec $(SED_I) 's/&lt;/</g' {} \;
	find docs/reference -name "*.md" -exec $(SED_I) 's/&gt;/>/g' {} \;
	find docs/reference -name "*.md" -exec $(SED_I) 's/&#34;/"/g' {} \;
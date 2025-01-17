/**
 * This file is a swizzled and wrapped component, generated and adapted from the
 * docusaurus source code, copyright of Facebook, Inc.
 *
 * The adapted content is licensed under the MIT licence; and the licence can be
 * found at https://github.com/facebook/docusaurus/blob/master/LICENSE
 *
 * To learn more about component swizzling, see:
 * https://docusaurus.io/docs/using-themes#wrapping-theme-components
 *
 * For original sources see:
 * https://github.com/facebook/docusaurus/tree/v2.0.0-beta.3/packages/docusaurus-theme-search-algolia/src/theme
 */
import { DocSearchButton, useDocSearchKeyboardEvents } from "@docsearch/react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useAlgoliaContextualFacetFilters from "@theme/hooks/useAlgoliaContextualFacetFilters";
import useSearchQuery from "@theme/hooks/useSearchQuery";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./styles.module.css";

let DocSearchModal = null;

function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>;
}

function ResultsFooter({ state, onClose }) {
  const { generateSearchPageLink } = useSearchQuery();

  return (
    <Link to={generateSearchPageLink(state.query)} onClick={onClose}>
      See all {state.context.nbHits} results
    </Link>
  );
}

function DocSearch({ contextualSearch, ...props }) {
  const { siteMetadata } = useDocusaurusContext();

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();

  const configFacetFilters = props.searchParameters?.facetFilters ?? [];

  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      [...contextualSearchFacetFilters, ...configFacetFilters]
    : // ... or use config facetFilters
      configFacetFilters;

  // we let user override default searchParameters if he wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters
  };

  const { withBaseUrl } = useBaseUrlUtils();
  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(null);

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css")
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div");
      document.body.insertBefore(searchContainer.current, document.body.firstChild);
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    searchContainer.current.remove();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
  );

  const navigator = useRef({
    navigate({ itemUrl }) {
      history.push(itemUrl);
    }
  }).current;

  const transformItems = useRef((items) => {
    return items.map((item) => {
      // We transform the absolute URL into a relative URL.
      // Alternatively, we can use `new URL(item.url)` but it's not
      // supported in IE.
      const a = document.createElement("a");
      a.href = item.url;

      return {
        ...item,
        url: withBaseUrl(`${a.pathname}${a.hash}`)
      };
    });
  }).current;

  const resultsFooterComponent = useMemo(
    () => (footerProps) => <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose]
  );

  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent("docusaurus", siteMetadata.docusaurusVersion);

      return searchClient;
    },
    [siteMetadata.docusaurusVersion]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef
  });

  // We override the default placeholder for the search bar input field
  const translatedSearchLabel = translate({
    id: "theme.SearchBar.label",
    // message: 'Search',
    message: "Search\xA0docs...",
    description: "The ARIA label and placeholder for search button"
  });

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and enables it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className={styles.searchBox}>
        <DocSearchButton
          onTouchStart={importDocSearchModalIfNeeded}
          onFocus={importDocSearchModalIfNeeded}
          onMouseOver={importDocSearchModalIfNeeded}
          onClick={onOpen}
          ref={searchButtonRef}
          translations={{
            buttonText: translatedSearchLabel,
            buttonAriaLabel: translatedSearchLabel
          }}
        />
      </div>

      {isOpen &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            resultsFooterComponent={resultsFooterComponent}
            transformSearchClient={transformSearchClient}
            {...props}
            searchParameters={searchParameters}
          />,
          searchContainer.current
        )}
    </>
  );
}

function SearchBar() {
  const { siteConfig } = useDocusaurusContext();
  return <DocSearch {...siteConfig.themeConfig.algolia} />;
}

export default SearchBar;

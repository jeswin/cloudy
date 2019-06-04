import React from "react";

export type UrlSetter = (path: string) => void;

let setUrlInState: UrlSetter;

export function setUrlSetter(fn: UrlSetter) {
  setUrlInState = fn;
}

export function createClickHandler(url: string) {
  return (ev: React.MouseEvent) => {
    history.pushState({}, "", url);
    setUrl(url);
    ev.preventDefault();
  };
}

export interface ILinkProps {
  title: string;
  url: string;
}

export function Link({ title, url }: ILinkProps) {
  return (
    <a href={url} onClick={createClickHandler(url)}>
      {title}
    </a>
  );
}

export function navigateTo(url: string) {
  history.pushState({}, "", url);
  setUrl(url);
}

export function setUrl(url: string) {
  setUrlInState(url);
}

export interface IMatchOptions {
  exact?: boolean;
}

export function matchUrlPrefix(
  prefix: string,
  opts: IMatchOptions,
  element: JSX.Element
) {
  const pathname = window.location.pathname;
  return opts.exact
    ? pathname === prefix
      ? element
      : undefined
    : (() => {
        const pathnameAndSlash = pathname.endsWith("/")
          ? pathname
          : `${pathname}/`;

        const slashAndPrefix = prefix.startsWith("/") ? prefix : `/${prefix}`;
        const slashAndPrefixAndSlash = slashAndPrefix.endsWith("/")
          ? slashAndPrefix
          : `${slashAndPrefix}/`;

        return pathnameAndSlash.startsWith(slashAndPrefixAndSlash)
          ? element
          : undefined;
      })();
}

export type StorePathInState = (path: string) => void;
let storePathInState: StorePathInState;

export function init(storePathInStateArg: StorePathInState) {
  storePathInState = storePathInStateArg;
}

export function notifyLocationChange(location: string) {
  storePathInState(location);
}

const isBrowser = typeof window !== "undefined";

export function createClickHandler(url: string) {
  return (ev: Event) => {
    if (isBrowser) {
      history.pushState({}, "", url);
      notifyLocationChange(url);
      ev.preventDefault();
    }
  };
}

// back button handling
if (isBrowser) {
  window.onpopstate = (ev: Event) =>
    notifyLocationChange(window.location.pathname);
}

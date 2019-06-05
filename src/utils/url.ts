export function getAuthServiceUrl(part: string) {
  return `${process.env.TOO_CLOUDY_AUTH_HOST}${
    part.startsWith("/") ? part : `/${part}`
  }`;
}

export function getWebUrl(part: string) {
  return `${process.env.TOO_CLOUDY_WEB_HOST}${
    part.startsWith("/") ? part : `/${part}`
  }`;
}

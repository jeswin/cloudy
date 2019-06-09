export function getAuthServiceUrl(part: string) {
  console.log(process.env.TOO_CLOUDY_AUTH_HOST);
  return `${process.env.TOO_CLOUDY_AUTH_HOST}${
    part === "" || part === "/" ? "" : part.startsWith("/") ? part : `/${part}`
  }`;
}

export function getWebUrl(part: string) {
  return `${process.env.TOO_CLOUDY_WEB_HOST}${
    part === "" || part === "/" ? "" : part.startsWith("/") ? part : `/${part}`
  }`;
}

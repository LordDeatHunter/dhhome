export const openLink = (url: string, openInNewTab: boolean = true) => {
  window.open(url, openInNewTab ? "_blank" : "_self");
};


const urlRegexp: RegExp = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
const HTTPVerbs = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE', 'OPTIONS'];

const isURL = (url: string) => {
  return urlRegexp.test(url);
}

const isHTTPVerbs = (str: string) => {
  return HTTPVerbs.indexOf(str) > -1;
}

export {
  isURL,
  isHTTPVerbs
};
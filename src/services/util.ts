
const urlRegexp: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
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
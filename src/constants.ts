const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  error: 1,
  success: 0,
};
export const DEFAULT_PORT = 3000;
const SSR_PORT = 8080;
const HttpCodes = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const ContentType = {
  PLAIN: `text/plain; charset=UTF-8`,
  HTML: `text/html; charset=utf-8`,
  CSS: `text/css; charset=utf-8`,
};
const STATIC_DIR = `src/express/static`;
const MOCK_FILE_PATH = `./mocks.json`;

export = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  ContentType,
  HttpCodes,
  SSR_PORT,
  STATIC_DIR,
  MOCK_FILE_PATH,
};


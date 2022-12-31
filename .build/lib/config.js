var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_exports = {};
__export(config_exports, {
  api: () => api,
  apiBaseUrl: () => apiBaseUrl,
  apiHost: () => apiHost,
  author: () => author,
  defaultPageCover: () => defaultPageCover,
  defaultPageCoverPosition: () => defaultPageCoverPosition,
  defaultPageIcon: () => defaultPageIcon,
  description: () => description,
  domain: () => domain,
  environment: () => environment,
  fathomConfig: () => fathomConfig,
  fathomId: () => fathomId,
  getMastodonHandle: () => getMastodonHandle,
  github: () => github,
  host: () => host,
  includeNotionIdInUrls: () => includeNotionIdInUrls,
  inversePageUrlOverrides: () => inversePageUrlOverrides,
  isDev: () => isDev,
  isPreviewImageSupportEnabled: () => isPreviewImageSupportEnabled,
  isRedisEnabled: () => isRedisEnabled,
  isSearchEnabled: () => isSearchEnabled,
  isServer: () => isServer,
  language: () => language,
  linkedin: () => linkedin,
  mastodon: () => mastodon,
  name: () => name,
  navigationLinks: () => navigationLinks,
  navigationStyle: () => navigationStyle,
  newsletter: () => newsletter,
  pageUrlAdditions: () => pageUrlAdditions,
  pageUrlOverrides: () => pageUrlOverrides,
  port: () => port,
  posthogConfig: () => posthogConfig,
  posthogId: () => posthogId,
  redisHost: () => redisHost,
  redisNamespace: () => redisNamespace,
  redisPassword: () => redisPassword,
  redisUrl: () => redisUrl,
  redisUser: () => redisUser,
  rootNotionPageId: () => rootNotionPageId,
  rootNotionSpaceId: () => rootNotionSpaceId,
  site: () => site,
  twitter: () => twitter,
  youtube: () => youtube,
  zhihu: () => zhihu
});
module.exports = __toCommonJS(config_exports);
var import_notion_utils = require("notion-utils");
var import_get_config_value = require("./get-config-value");
const rootNotionPageId = (0, import_notion_utils.parsePageId)(
  (0, import_get_config_value.getSiteConfig)("rootNotionPageId"),
  { uuid: false }
);
if (!rootNotionPageId) {
  throw new Error('Config error invalid "rootNotionPageId"');
}
const rootNotionSpaceId = (0, import_notion_utils.parsePageId)(
  (0, import_get_config_value.getSiteConfig)("rootNotionSpaceId", null),
  { uuid: true }
);
const pageUrlOverrides = cleanPageUrlMap(
  (0, import_get_config_value.getSiteConfig)("pageUrlOverrides", {}) || {},
  { label: "pageUrlOverrides" }
);
const pageUrlAdditions = cleanPageUrlMap(
  (0, import_get_config_value.getSiteConfig)("pageUrlAdditions", {}) || {},
  { label: "pageUrlAdditions" }
);
const inversePageUrlOverrides = invertPageUrlOverrides(pageUrlOverrides);
const environment = process.env.NODE_ENV || "development";
const isDev = environment === "development";
const name = (0, import_get_config_value.getSiteConfig)("name");
const author = (0, import_get_config_value.getSiteConfig)("author");
const domain = (0, import_get_config_value.getSiteConfig)("domain");
const description = (0, import_get_config_value.getSiteConfig)("description", "Notion Blog");
const language = (0, import_get_config_value.getSiteConfig)("language", "en");
const twitter = (0, import_get_config_value.getSiteConfig)("twitter", null);
const mastodon = (0, import_get_config_value.getSiteConfig)("mastodon", null);
const github = (0, import_get_config_value.getSiteConfig)("github", null);
const youtube = (0, import_get_config_value.getSiteConfig)("youtube", null);
const linkedin = (0, import_get_config_value.getSiteConfig)("linkedin", null);
const newsletter = (0, import_get_config_value.getSiteConfig)("newsletter", null);
const zhihu = (0, import_get_config_value.getSiteConfig)("zhihu", null);
const getMastodonHandle = () => {
  if (!mastodon) {
    return null;
  }
  const url = new URL(mastodon);
  return `${url.pathname.slice(1)}@${url.hostname}`;
};
const defaultPageIcon = (0, import_get_config_value.getSiteConfig)(
  "defaultPageIcon",
  null
);
const defaultPageCover = (0, import_get_config_value.getSiteConfig)(
  "defaultPageCover",
  null
);
const defaultPageCoverPosition = (0, import_get_config_value.getSiteConfig)(
  "defaultPageCoverPosition",
  0.5
);
const isPreviewImageSupportEnabled = (0, import_get_config_value.getSiteConfig)(
  "isPreviewImageSupportEnabled",
  false
);
const includeNotionIdInUrls = (0, import_get_config_value.getSiteConfig)(
  "includeNotionIdInUrls",
  !!isDev
);
const navigationStyle = (0, import_get_config_value.getSiteConfig)(
  "navigationStyle",
  "default"
);
const navigationLinks = (0, import_get_config_value.getSiteConfig)(
  "navigationLinks",
  null
);
const isSearchEnabled = (0, import_get_config_value.getSiteConfig)("isSearchEnabled", true);
const isRedisEnabled = (0, import_get_config_value.getSiteConfig)("isRedisEnabled", false) || !!(0, import_get_config_value.getEnv)("REDIS_ENABLED", null);
const redisHost = (0, import_get_config_value.getEnv)("REDIS_HOST", null);
const redisPassword = (0, import_get_config_value.getEnv)("REDIS_PASSWORD", null);
const redisUser = (0, import_get_config_value.getEnv)("REDIS_USER", "default");
const redisUrl = (0, import_get_config_value.getEnv)(
  "REDIS_URL",
  `redis://${redisUser}:${redisPassword}@${redisHost}`
);
const redisNamespace = (0, import_get_config_value.getEnv)(
  "REDIS_NAMESPACE",
  "preview-images"
);
const isServer = typeof window === "undefined";
const port = (0, import_get_config_value.getEnv)("PORT", "3000");
const host = isDev ? `http://localhost:${port}` : `https://${domain}`;
const apiHost = isDev ? host : `https://${process.env.VERCEL_URL || domain}`;
const apiBaseUrl = `/api`;
const api = {
  searchNotion: `${apiBaseUrl}/search-notion`,
  getNotionPageInfo: `${apiBaseUrl}/notion-page-info`,
  getSocialImage: `${apiBaseUrl}/social-image`
};
const site = {
  domain,
  name,
  rootNotionPageId,
  rootNotionSpaceId,
  description
};
const fathomId = isDev ? null : process.env.NEXT_PUBLIC_FATHOM_ID;
const fathomConfig = fathomId ? {
  excludedDomains: ["localhost", "localhost:3000"]
} : void 0;
const posthogId = process.env.NEXT_PUBLIC_POSTHOG_ID;
const posthogConfig = {
  api_host: "https://app.posthog.com"
};
function cleanPageUrlMap(pageUrlMap, {
  label
}) {
  return Object.keys(pageUrlMap).reduce((acc, uri) => {
    const pageId = pageUrlMap[uri];
    const uuid = (0, import_notion_utils.parsePageId)(pageId, { uuid: false });
    if (!uuid) {
      throw new Error(`Invalid ${label} page id "${pageId}"`);
    }
    if (!uri) {
      throw new Error(`Missing ${label} value for page "${pageId}"`);
    }
    if (!uri.startsWith("/")) {
      throw new Error(
        `Invalid ${label} value for page "${pageId}": value "${uri}" should be a relative URI that starts with "/"`
      );
    }
    const path = uri.slice(1);
    return {
      ...acc,
      [path]: uuid
    };
  }, {});
}
function invertPageUrlOverrides(pageUrlOverrides2) {
  return Object.keys(pageUrlOverrides2).reduce((acc, uri) => {
    const pageId = pageUrlOverrides2[uri];
    return {
      ...acc,
      [pageId]: uri
    };
  }, {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  api,
  apiBaseUrl,
  apiHost,
  author,
  defaultPageCover,
  defaultPageCoverPosition,
  defaultPageIcon,
  description,
  domain,
  environment,
  fathomConfig,
  fathomId,
  getMastodonHandle,
  github,
  host,
  includeNotionIdInUrls,
  inversePageUrlOverrides,
  isDev,
  isPreviewImageSupportEnabled,
  isRedisEnabled,
  isSearchEnabled,
  isServer,
  language,
  linkedin,
  mastodon,
  name,
  navigationLinks,
  navigationStyle,
  newsletter,
  pageUrlAdditions,
  pageUrlOverrides,
  port,
  posthogConfig,
  posthogId,
  redisHost,
  redisNamespace,
  redisPassword,
  redisUrl,
  redisUser,
  rootNotionPageId,
  rootNotionSpaceId,
  site,
  twitter,
  youtube,
  zhihu
});
//# sourceMappingURL=config.js.map

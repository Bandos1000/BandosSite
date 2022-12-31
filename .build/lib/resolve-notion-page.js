var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var resolve_notion_page_exports = {};
__export(resolve_notion_page_exports, {
  resolveNotionPage: () => resolveNotionPage
});
module.exports = __toCommonJS(resolve_notion_page_exports);
var import_notion_utils = require("notion-utils");
var acl = __toESM(require("./acl"));
var import_config = require("./config");
var import_db = require("./db");
var import_get_site_map = require("./get-site-map");
var import_notion = require("./notion");
async function resolveNotionPage(domain, rawPageId) {
  let pageId;
  let recordMap;
  if (rawPageId && rawPageId !== "index") {
    pageId = (0, import_notion_utils.parsePageId)(rawPageId);
    if (!pageId) {
      const override = import_config.pageUrlOverrides[rawPageId] || import_config.pageUrlAdditions[rawPageId];
      if (override) {
        pageId = (0, import_notion_utils.parsePageId)(override);
      }
    }
    const useUriToPageIdCache = true;
    const cacheKey = `uri-to-page-id:${domain}:${import_config.environment}:${rawPageId}`;
    const cacheTTL = void 0;
    if (!pageId && useUriToPageIdCache) {
      try {
        pageId = await import_db.db.get(cacheKey);
      } catch (err) {
        console.warn(`redis error get "${cacheKey}"`, err.message);
      }
    }
    if (pageId) {
      recordMap = await (0, import_notion.getPage)(pageId);
    } else {
      const siteMap = await (0, import_get_site_map.getSiteMap)();
      pageId = siteMap == null ? void 0 : siteMap.canonicalPageMap[rawPageId];
      if (pageId) {
        recordMap = await (0, import_notion.getPage)(pageId);
        if (useUriToPageIdCache) {
          try {
            await import_db.db.set(cacheKey, pageId, cacheTTL);
          } catch (err) {
            console.warn(`redis error set "${cacheKey}"`, err.message);
          }
        }
      } else {
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404
          }
        };
      }
    }
  } else {
    pageId = import_config.site.rootNotionPageId;
    console.log(import_config.site);
    recordMap = await (0, import_notion.getPage)(pageId);
  }
  const props = { site: import_config.site, recordMap, pageId };
  return { ...props, ...await acl.pageAcl(props) };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveNotionPage
});
//# sourceMappingURL=resolve-notion-page.js.map

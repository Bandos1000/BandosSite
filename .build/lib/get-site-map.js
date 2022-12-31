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
var get_site_map_exports = {};
__export(get_site_map_exports, {
  getSiteMap: () => getSiteMap
});
module.exports = __toCommonJS(get_site_map_exports);
var import_notion_utils = require("notion-utils");
var import_p_memoize = __toESM(require("p-memoize"));
var config = __toESM(require("./config"));
var import_config = require("./config");
var import_get_canonical_page_id = require("./get-canonical-page-id");
var import_notion_api = require("./notion-api");
const uuid = !!import_config.includeNotionIdInUrls;
async function getSiteMap() {
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config.rootNotionSpaceId
  );
  return {
    site: config.site,
    ...partialSiteMap
  };
}
const getAllPages = (0, import_p_memoize.default)(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
});
async function getAllPagesImpl(rootNotionPageId, rootNotionSpaceId) {
  const getPage = async (pageId, ...args) => {
    console.log("\nnotion getPage", (0, import_notion_utils.uuidToId)(pageId));
    return import_notion_api.notion.getPage(pageId, ...args);
  };
  const pageMap = await (0, import_notion_utils.getAllPagesInSpace)(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  );
  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }
      const canonicalPageId = (0, import_get_canonical_page_id.getCanonicalPageId)(pageId, recordMap, {
        uuid
      });
      if (map[canonicalPageId]) {
        console.warn("error duplicate canonical page id", {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId]
        });
        return map;
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId
        };
      }
    },
    {}
  );
  return {
    pageMap,
    canonicalPageMap
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSiteMap
});
//# sourceMappingURL=get-site-map.js.map

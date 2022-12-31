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
var notion_exports = {};
__export(notion_exports, {
  getPage: () => getPage,
  search: () => search
});
module.exports = __toCommonJS(notion_exports);
var import_notion_utils = require("notion-utils");
var import_p_map = __toESM(require("p-map"));
var import_p_memoize = __toESM(require("p-memoize"));
var import_config = require("./config");
var import_notion_api = require("./notion-api");
var import_preview_images = require("./preview-images");
const getNavigationLinkPages = (0, import_p_memoize.default)(
  async () => {
    const navigationLinkPageIds = (import_config.navigationLinks || []).map((link) => link.pageId).filter(Boolean);
    if (import_config.navigationStyle !== "default" && navigationLinkPageIds.length) {
      return (0, import_p_map.default)(
        navigationLinkPageIds,
        async (navigationLinkPageId) => import_notion_api.notion.getPage(navigationLinkPageId, {
          chunkLimit: 1,
          fetchMissingBlocks: false,
          fetchCollections: false,
          signFileUrls: false
        }),
        {
          concurrency: 4
        }
      );
    }
    return [];
  }
);
async function getPage(pageId) {
  let recordMap = await import_notion_api.notion.getPage(pageId);
  if (import_config.navigationStyle !== "default") {
    const navigationLinkRecordMaps = await getNavigationLinkPages();
    if (navigationLinkRecordMaps == null ? void 0 : navigationLinkRecordMaps.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) => (0, import_notion_utils.mergeRecordMaps)(map, navigationLinkRecordMap),
        recordMap
      );
    }
  }
  if (import_config.isPreviewImageSupportEnabled) {
    const previewImageMap = await (0, import_preview_images.getPreviewImageMap)(recordMap);
    recordMap.preview_images = previewImageMap;
  }
  return recordMap;
}
async function search(params) {
  return import_notion_api.notion.search(params);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPage,
  search
});
//# sourceMappingURL=notion.js.map

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
var search_notion_exports = {};
__export(search_notion_exports, {
  searchNotion: () => searchNotion
});
module.exports = __toCommonJS(search_notion_exports);
var import_expiry_map = __toESM(require("expiry-map"));
var import_isomorphic_unfetch = __toESM(require("isomorphic-unfetch"));
var import_p_memoize = __toESM(require("p-memoize"));
var import_config = require("./config");
const searchNotion = (0, import_p_memoize.default)(searchNotionImpl, {
  cacheKey: (args) => {
    var _a;
    return (_a = args[0]) == null ? void 0 : _a.query;
  },
  cache: new import_expiry_map.default(1e4)
});
async function searchNotionImpl(params) {
  return (0, import_isomorphic_unfetch.default)(import_config.api.searchNotion, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json"
    }
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    const error = new Error(res.statusText);
    error.response = res;
    return Promise.reject(error);
  }).then((res) => res.json());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchNotion
});
//# sourceMappingURL=search-notion.js.map

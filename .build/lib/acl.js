var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var acl_exports = {};
__export(acl_exports, {
  pageAcl: () => pageAcl
});
module.exports = __toCommonJS(acl_exports);
async function pageAcl({
  site,
  recordMap,
  pageId
}) {
  var _a;
  if (!site) {
    return {
      error: {
        statusCode: 404,
        message: "Unable to resolve notion site"
      }
    };
  }
  if (!recordMap) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" not found.`
      }
    };
  }
  const keys = Object.keys(recordMap.block);
  const rootKey = keys[0];
  if (!rootKey) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" invalid data.`
      }
    };
  }
  const rootValue = (_a = recordMap.block[rootKey]) == null ? void 0 : _a.value;
  const rootSpaceId = rootValue == null ? void 0 : rootValue.space_id;
  if (rootSpaceId && site.rootNotionSpaceId && rootSpaceId !== site.rootNotionSpaceId) {
    if (process.env.NODE_ENV) {
      return {
        error: {
          statusCode: 404,
          message: `Notion page "${pageId}" doesn't belong to the Notion workspace owned by "${site.domain}".`
        }
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pageAcl
});
//# sourceMappingURL=acl.js.map

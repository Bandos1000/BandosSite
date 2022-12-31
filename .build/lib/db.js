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
var db_exports = {};
__export(db_exports, {
  db: () => db
});
module.exports = __toCommonJS(db_exports);
var import_core = __toESM(require("@keyvhq/core"));
var import_redis = __toESM(require("@keyvhq/redis"));
var import_config = require("./config");
let db;
if (import_config.isRedisEnabled) {
  const keyvRedis = new import_redis.default(import_config.redisUrl);
  db = new import_core.default({ store: keyvRedis, namespace: import_config.redisNamespace || void 0 });
} else {
  db = new import_core.default();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  db
});
//# sourceMappingURL=db.js.map
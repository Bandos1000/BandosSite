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
var get_config_value_exports = {};
__export(get_config_value_exports, {
  getEnv: () => getEnv,
  getSiteConfig: () => getSiteConfig
});
module.exports = __toCommonJS(get_config_value_exports);
var import_site = __toESM(require("../site.config"));
if (!import_site.default) {
  throw new Error(`Config error: invalid site.config.ts`);
}
let siteConfigOverrides;
try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG);
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse');
  throw err;
}
const siteConfig = {
  ...import_site.default,
  ...siteConfigOverrides
};
function getSiteConfig(key, defaultValue) {
  const value = siteConfig[key];
  if (value !== void 0) {
    return value;
  }
  if (defaultValue !== void 0) {
    return defaultValue;
  }
  throw new Error(`Config error: missing required site config value "${key}"`);
}
function getEnv(key, defaultValue, env = process.env) {
  const value = env[key];
  if (value !== void 0) {
    return value;
  }
  if (defaultValue !== void 0) {
    return defaultValue;
  }
  throw new Error(`Config error: missing required env variable "${key}"`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEnv,
  getSiteConfig
});
//# sourceMappingURL=get-config-value.js.map

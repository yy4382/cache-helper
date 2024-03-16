# Cache Helper

使用 persistentStore 的缓存工具，支持缓存过期时间功能。

## 使用

可以直接把 index.min.js 文件内容拷贝到脚本中，也可以通过 npm 安装。

```bash
npm i persistent-store-cache-helper

pnpm add persistent-store-cache-helper
```

```javascript
import cache_read from "persistent-store-cache-helper";
let result = "";
!(async () => {
  result = await cache_read(
    "cache_helper_test",
    "https://github.com/yy4382/cache-helper/raw/main/README.md"
  );
})().finally(() => {
  $done({ body: result });
});
```

## API

暴露了 `cache_read` 方法。

### 参数

##### key `{String}`

缓存的键。

##### url `{String}`

获取数据的 URL。

##### maxAge `{Number}`

缓存的最大时间，单位为秒。可选。0 表示每次都重新获取。 -1 表示永不过期。

在每次获取缓存时，会检查缓存是否过期。如果过期，会重新获取数据。

默认为 3600。

##### expireInfoKey `{String}`

用于存储过期信息的键。可选。默认为 `json.cacheHelper.expireInfo`。无特殊需要不必更改。

### 返回值

##### `Promise<string>`

返回一个 Promise 对象，resolve 时返回缓存的数据。

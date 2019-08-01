'use strict';

const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(((resolve) => { resolve(result.value); })).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  }));
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const koa_body_1 = __importDefault(require('koa-body'));
const koa_router_1 = __importDefault(require('koa-router'));
const koa2_cors_1 = __importDefault(require('koa2-cors'));
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const data_1 = require('./data');

const app = new koa_1.default();
const router = new koa_router_1.default();
const options = {
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  },
};
app.use(koa_body_1.default(options));
app.use(koa2_cors_1.default());
app.use(router.routes());
app.use(router.allowedMethods());
router.post('/adduser', ctx => __awaiter(this, void 0, void 0, function* () {
  const { name, age } = ctx.request.body;
  yield data_1.addUser({
    name,
    age,
  }).then((res) => {
    if (res) {
      ctx.body = {
        msg: true,
      };
    } else {
      ctx.body = {
        msg: false,
      };
    }
  });
})).post('/addimg', ctx => __awaiter(this, void 0, void 0, function* () {
  const file = ctx.request.files.imgfile; // 获取上传文件 imgfile 为前端自定义
  const reader = fs_1.default.createReadStream(file.path); // 创建读流
  const filePath = `${path_1.default.resolve(__dirname, 'upload/')}/${file.name}`;
  const upStream = fs_1.default.createWriteStream(filePath);
  reader.pipe(upStream);
  ctx.body = {
    url: 'xxxx',
  };
}));
app.listen(3000, () => {
  console.log(3000);
});

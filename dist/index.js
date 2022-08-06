"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shell_exec_1 = __importDefault(require("shell-exec"));
const morganMiddleware_1 = __importDefault(require("./common/morganMiddleware"));
const app = (0, express_1.default)();
// app.use(cors());
app.use(morganMiddleware_1.default);
app.use('/images', express_1.default.static('images'));
// app.set('jsonp callback name', 'jsoncallback')
app.get('/', (request, response, next) => {
    response.send('Home!');
});
app.get('/tw', async (request, response, next) => {
    let resJosn = {};
    (0, shell_exec_1.default)('/home/spacebank/twright/tw.sh').then(console.log).catch(console.log);
    resJosn = {
        code: 'S001',
        message: 'Success'
    };
    response.jsonp(resJosn);
    // response.send('callback' + '('+ JSON.stringify(resJosn) + ');');
});
// app.get('/:id', async (request:Request, response:Response, next: NextFunction) => {
//   const json = {
//     id: request.params.id,
//     pwd:'b'
//   }
//   response.json(json)
// });
app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000
  ################################################
`);
});
//# sourceMappingURL=index.js.map
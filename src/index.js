"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { exec } = require("child_process");
const app = (0, express_1.default)();
app.use('/images', express_1.default.static('images'));
app.get('/', (request, response, next) => {
    response.send('welcome!');
});
app.get('/:id', async (request, response, next) => {
    const json = {
        id: request.params.id,
        pwd: 'b'
    };
    response.json(json);
});
app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000
  ################################################
`);
});

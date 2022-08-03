import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use('/images', express.static('images'));

app.get('/', (request:Request, response:Response, next: NextFunction) => {
  response.send('welcome!');
});

app.get('/:id', async (request:Request, response:Response, next: NextFunction) => {
  const json = {
    id: request.params.id,
    pwd:'b'
  }
  response.json(json)
});

app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000
  ################################################
`);
});
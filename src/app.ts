import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.get('/', (request:Request, response:Response, next: NextFunction) => {
  const json = {
    id:'a',
    pwd:'b'
  }
  response.json(json)
});

app.listen(3000,()=>{
  console.log('start')
})
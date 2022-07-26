import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.get('/:id', (request:Request, response:Response, next: NextFunction) => {
  const json = {
    id: request.params.id,
    pwd:'b'
  }
  response.json(json)
});

app.listen(3000,()=>{
  console.log('start')
})
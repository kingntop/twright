import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use('/images', express.static('images'));

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000
  ################################################
`);
});
import {Request, Response} from 'express';

export const cors = () => (req: Request, res: Response, next: () => void) => {
  res.header('Access-Control-Allow-Origin', <any>req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true.toString());
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, x-access-token, x-user, Content-Type, Accept, Authentication, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST,HEAD, OPTIONS,PUT, DELETE, PATCH');
  next();
};

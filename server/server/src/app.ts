import express, {Request as ExRequest, Response as ExResponse, json, urlencoded} from 'express';
import swaggerUi from 'swagger-ui-express';
import {cors} from './infrastructure/cors-middleware';
import {RegisterRoutes} from './routes';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use(cors());

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

RegisterRoutes(app);

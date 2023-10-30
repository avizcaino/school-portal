import {app} from './app';
import './infrastructure';
const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

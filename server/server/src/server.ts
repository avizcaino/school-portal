import {app} from './app';
import './infrastructure';
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

import {app} from './app';
import {initializeInfrastructure} from './infrastructure';
const port = process.env.PORT || 3002;

initializeInfrastructure();

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

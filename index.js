import app from './app.js'
import { serverPort as port } from './config/config.js'

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
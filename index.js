// eslint-disable-next-line import/extensions
const { app } = require('./build/server.js');

const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log('Application is started on localhost:', port);
});

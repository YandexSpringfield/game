const { app } = require('./dist/server');

const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log('Application is started on localhost:', port);
});

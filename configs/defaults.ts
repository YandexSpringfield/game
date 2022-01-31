// import { join } from 'path';
// import { AppConfig } from 'cfg';

const path = require('path');

// const config = {
//   langs: ['ru'],

//   static: {
//     dir: path.join(__dirname, '..', 'client'),
//     staticDir: path.join(__dirname, '..', '..', 'static'),
//   },

//   render: {
//     isHot: false,
//   },
// };

module.exports = {
  langs: ['ru'],

  static: {
    dir: path.join(__dirname, '..', 'client'),
    staticDir: path.join(__dirname, '..', '..', 'static'),
  },

  render: {
    isHot: false,
  },
};
// module.exports = config;

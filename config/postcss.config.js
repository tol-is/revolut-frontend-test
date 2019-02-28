const path = require('path');

const src = path.resolve(__dirname, '..', 'src');
const root = path.resolve(__dirname, '../');

module.exports = [
  require('postcss-import')({
    root : root,
    path : [
      src,
    ],
  }),
  require("stylelint")({
    fix : true,
  }),
  require('postcss-flexbugs-fixes'),
  require('postcss-responsive-type'),
  require('postcss-preset-env')({
    stage    : 1,
    features : {
      'nesting-rules' : true,
    },
    browsers : [
      '>1%',
      'last 4 versions',
    ],
  }),
];

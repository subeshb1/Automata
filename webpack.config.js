const path = require('path');


module.exports = {
    entry: path.resolve(__dirname,'static') + '/src/index.js',
    output: {
        path: path.resolve(__dirname,'static') + '/dist/app',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'static')+'/src',
                loader: 'babel-loader',
                query: {
                  presets:  ['es2016']
                }
            }
        ]
    }

};
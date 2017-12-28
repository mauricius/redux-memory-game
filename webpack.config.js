var path = require('path')
var webpack = require('webpack')

var entry = ['./index']
var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
]

if (process.env.NODE_ENV === "development") {
    entry.push('webpack-hot-middleware/client')
    plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }))
}

module.exports = {
    devtool: '@source-map',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: plugins,
    module: {
        loaders: [
            { test: /\.js$/, loaders: [ 'babel' ], exclude: /node_modules/, include: __dirname },
            { test: /\.css?$/, loaders: [ 'style', 'raw' ], include: __dirname }
        ]
    }
}

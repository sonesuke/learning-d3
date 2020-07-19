const path = require('path');
module.exports = {
    entry: {
        bundle: './src/app.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: '0.0.0.0',
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test:/\.ts$/, loader: 'ts-loader'
            },
            {
                test:/\.csv$/, loader: 'url-loader', options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test:/\.json$/, loader: 'url-loader', options: {
                    name: '[path][name].[ext]'
                }
            }

        ]
    }
}
import { Configuration } from 'webpack'

const { join } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: join(__dirname, 'src'),
    entry: {
        'chrome_firefox/index': './chrome_firefox/index.ts',
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['js', 'ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
    cache: false,
    plugins: [
        new CopyWebpackPlugin([{
            from: '**/manifest.json',
            to: join(__dirname, 'dist'),
        }], {
            copyUnmodified: true
        }),
    ],
} as Configuration

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        // new CopyWebpackPlugin({
        //     patterns: [{ from: './public', to: './' }],
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [{ from: './public/images', to: './images' }],
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/images', to: './images' },
                { from: './public/manifest.json', to: './' }, // Add this line for manifest.json
            ],
        }),
        new GenerateSW({
            swDest: 'service-worker.js',
            skipWaiting: true,
            clientsClaim: true,

        }
        ),
        // new InjectManifest({
        //     swSrc: './src/service-worker.js', // Specify your service worker file
        // }),
        // new WorkboxWebpackPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        open: true,
        port: 3333,
        hot: true,
    },
};

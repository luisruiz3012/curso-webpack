const path = require('path'); //Utiliza un require que me ayuda a traer este elemento
const HtmlWebpackPlugin = require('html-webpack-plugin') //Para usa webpack con HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //Para usar webpack con CSS
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')


module.exports = {
    // Aqui van las configuraciones

    entry: './src/index.js', //Aqui va el punto de entrada de la aplicacion
    output: { //Hacia donde vamos a enviar lo que va a preparar Webpack
        path: path.resolve(__dirname, 'dist'), //Nos va permitir saber donde se encuentra nuestro proyecto
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: { //Aqui va la configuracion de babel para el proyecto y pones las rules
        rules: [
            {
                test: /\.m?js^$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /.(woff)|(woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'application/font-woff',
                        name: "[name].[contenthash].[ext]",
                        outputPath: './assets/fonts/',
                        publicPath: '../assets/fonts/',
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}
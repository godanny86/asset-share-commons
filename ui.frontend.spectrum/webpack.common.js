'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
        entry: {
            site: __dirname + '/src/index.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/etc.clientlibs/asset-share-commons/clientlibs/clientlib-webcomponents/resources/'
        },
        optimization: {
            splitChunks: {
                   chunks: 'all'
                 }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'webpack-import-glob-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                 // this rule handles images
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                    use: 'file-loader?name=../resources/images/[name].[ext]?[hash]'
                },
                // the following 3 rules handle font extraction
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=../resources/fonts/[name].[ext]&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=../resources/fonts/[name].[ext]'
                },
                {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=../resources/fonts/[name].[ext]&mimetype=application/font-otf'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(@spectrum-web-components)\/).*/,
                    loader: 'string-replace-loader',
                    options: {
                        search: /customElements.define\('(.*)'/,
                        replace: (_match, p1) => `!customElements.get('${p1}') && customElements.define('${p1}'`,
                        flags: 'g'
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css'
            })
        ],
        stats: {
            assetsSort: "chunks",
            builtAt: true,
            children: false,
            chunkGroups: true,
            chunkOrigins: true,
            colors: false,
            errors: true,
            errorDetails: true,
            env: true,
            modules: false,
            performance: true,
            providedExports: false,
            source: false,
            warnings: true
        }
};

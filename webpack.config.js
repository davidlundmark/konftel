var debug = true; //process.env.NODE_ENV !== 'production';

var webpack = require('webpack');
var extracttextplugin = require('extract-text-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

//var livereloadplugin = require('webpack-livereload-plugin');

var jsFile = './src/scripts.min.js';
var cssFile = './src/styles.min.css';

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: [
        './app.js'
        /*,
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',*/
    ],
    output: {
        path: __dirname,
        filename: jsFile,
        publicPath: '../' //used on index to find the dist folder
    },
    //watch: true,
    plugins: debug ? [
        new extracttextplugin(cssFile),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        //new webpack.HotModuleReplacementPlugin()
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new extracttextplugin(cssFile),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ],
    module: {
        loaders: debug ? [{
                test: /\.scss$/,
                loader: extracttextplugin.extract(
                    'style-loader', // The backup style loader
                    ['css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
                ),
                exclude: /node_modules/
            },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader?name=./src/assets/fonts/[name]/[name].[ext]", exclude: [/images/, /node_modules/] },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=./src/assets/images/[name].[ext]', exclude: [/fonts/, /node_modules/] }
        ] : [{
                test: /\.scss$/,
                loader: extracttextplugin.extract(
                    'style-loader', // The backup style loader
                    ['css-loader', 'postcss-loader', 'sass-loader']
                ),
                exclude: /node_modules/
            },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader?name=./src/assets/fonts/[name]/[name].[ext]", exclude: [/images/, /node_modules/] },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=./src/assets/images/[name].[ext]', exclude: [/fonts/, /node_modules/] }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    // 'Android >= 2.3',
                    // 'BlackBerry >= 7',
                    // 'Chrome >= 9',
                    // 'Firefox >= 4',
                    // 'Explorer >= 9',
                    // 'iOS >= 5',
                    // 'Opera >= 11',
                    // 'Safari >= 5',
                    // 'OperaMobile >= 11',
                    // 'OperaMini >= 6',
                    // 'ChromeAndroid >= 9',
                    // 'FirefoxAndroid >= 4',
                    // 'ExplorerMobile >= 9'
                    '> 1%'
                ]
            }),
            precss
        ];
    },
    sassLoader: {
        includePaths: [].concat('client/style' )
    }/*,
    devServer: {
        inline: true
    }*/
};

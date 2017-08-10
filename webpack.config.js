/**
 * Created by cinque on 2017/5/16.
 */
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {LoaderOptionsPlugin, DefinePlugin} = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyes-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const del = require("del");
const webpack = require("webpack");
const node_env = process.env.NODE_ENV; //dev-开发（热加载）;test-测试；product-生产
const distPath = node_env == "develop"? "../webapp/newFrame/" + node_env:"./" + node_env;
const pathSrc = path.resolve(__dirname, "src");
const pathHtml = path.resolve(distPath, 'html');
const pathNodeModules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(pathNodeModules, 'react/dist/react.js');
const pathToReactDOM = path.resolve(pathNodeModules, 'react-dom/dist/react-dom.js');
console.log(`本次编译环境是: ${node_env}`);
console.log("path"+distPath);
const entry = () => (
    {
        index: resolve(__dirname, 'src/js/pages/app.js'),           //入口文件
/*        vendor: [                                                  //公共资源js打包成一个文件；
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'redux',
            'redux-thunk'
        ]*/
    }
);

const output = () => {
    let output = {
        path: resolve(__dirname, distPath),       //输出路径
        chunkFilename: '[id].chunk.js',
        filename: 'js/[name].js',                 //生成的js路径和名称配置
        publicPath: '../'                         //资源引用
    };
    if (node_env != 'develop') {
        output.path = resolve(__dirname, distPath);
        output.filename = 'js/[name]-[chunkhash:8].js';
    }
    return output;
};

const plugins = () => {
    let commonPlugins = [ //任何环境下都要用的插件
        new HtmlWebpackPlugin({                                     //生成新的html，自动引用css、js、images
            filename: pathHtml + "/index.html",                     //生成的html路径和名称配置
            template: path.resolve(pathSrc, "html/index.html"),     //生成的html的模板，以此模板为基础添加js、css、images的连接
            title:"webpack试用于公司项目"                           //设置新的HTML的title，需要HTML配合设置
        }),
        new DefinePlugin({                                         //允许创建一个在编译时可以配置的全局常量
            "process.env": {
                NODE_ENV: JSON.stringify(node_env)
            }
        }),
        new CopyWebpackPlugin([                                    //复制文件
            {from: resolve(__dirname, "src/images/"), to: resolve(__dirname, distPath+"/images/"), toType: 'dir'},
            {from: resolve(__dirname, "src/html/404.html"), to: resolve(__dirname, distPath+"/html/"), toType: 'dir'},
            {from: resolve(__dirname, "src/html/500.html"), to: resolve(__dirname, distPath+"/html/"), toType: 'dir'}
        ]),
    ], devPlugins = [
        new ExtractTextPlugin('css/[name].css'),                   //把css单独分离出来的插件，需要和modules配合使用
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest:resolve(__dirname, distPath,"manifest.json")
        })
    ], testPlugins = [
        new ExtractTextPlugin('css/[name]_[hash:8].css'),
    ], prodPlugins = [
        new ExtractTextPlugin('css/[name]_[hash:8].css'),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new UglifyJsPlugin({                                       //压缩js文件
            beautify: false,
            mangle: {                                               //压缩跳过这些
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {                                             //
                screw_ie8: true,
                reduce_vars: false
            },
            comments: false                                        //版权注释:false,取消版权注释。
        })
    ];
    if (node_env === 'develop') {
        return [...commonPlugins, ...devPlugins];
    } else if (node_env === 'test') {
        return [...commonPlugins, ...testPlugins];
    } else if (node_env === 'product') {
        return [...commonPlugins, ...prodPlugins];
    } else {
        return [...commonPlugins];
    }

};

const modules = () => ({
    rules: [
        {
            test: /\.js?$/,                                //正则匹配js文件
            exclude: /node_modules/,                       //正则忽略打包文件
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        presets: ['react', 'es2015']
                    }
                }
            ]
        },
        {
            test: /\.css$/,                             //正则匹配css文件
            use: ExtractTextPlugin.extract({            //配合插件分离css，通过link引入文件，而不是内联
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,     //正则匹配图片、字体文件
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                },
                'image-webpack-loader'
            ]
        }
    ]
});

const resolveModules = ()=>({                                    //解析
    modules: ['node_modules', pathNodeModules],
    extensions: [ '.web.js', '.jsx', '.js', '.json'],             //解析,可以使得文件后缀名匹配，不需要写全
    alias: {                                                      //以key值来作为引用value值的地址
        "react": pathToReact,
        "react-dom": pathToReactDOM
    }
})

// 删除文件
function delFiles() {
    console.log("执行：清空原文件");
    del([distPath+"/**/*"],{force:true})
}

const isNotDev = ()=>{
    return node_env != "develop"
};
if (isNotDev()){
    delFiles();
}

let config = {
    entry: entry(),
    output: output(),
    plugins: plugins(),
    module: modules(),
    resolve: resolveModules(),
    devtool: (node_env === 'develop') ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',   //开发者调试设置
}

module.exports = config;


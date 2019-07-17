const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GroupCssMediaQueriesLoader = require('group-css-media-queries-loader');
const smartgrid = require('smart-grid');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module:{
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
    {
        test: /\.scss$/,
        use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: { sourceMap: true}
            }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
            },
            {
                loader: 'sass-loader',
                options: { sourceMap: true}
            },
        ]
    },
    {
        test: /\.css$/,
        use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: { sourceMap: true}
            }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
            }
        ]
    },
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
    }
    
    ]
    },
    devServer: {
        overlay: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "./css/css.css",
          template: './src/scss/main.scss',
        }),
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin([
            {from:'./src/assets/images',to:'./images'},
        ]), 
      
      ],
};

/* It's principal settings in smart grid project */
const settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/scss', settings);
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const PRODUCTION = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
	filename: 'styles.[contenthash].css',
	disable: !PRODUCTION
});

const commonPlugins = [
	new HTMLWebpackPlugin({
		template: 'index-template.ejs',
		inject: false
	}),
	// new HTMLWebpackPlugin({
	// 	template: 'index.html',
	// 	inject: false,
	// 	// favicon: './client/assets/images/favicon.png'
	// }),
	extractSass
];

const plugins = PRODUCTION
	? [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true
				},
				output: {
					comments: false
				}
			}),
			...commonPlugins
		]
	: [...commonPlugins];

module.exports = {
	entry: {
		bundle: ['babel-polyfill', './client/src/index.jsx']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '',
		filename: '[name].[hash].js'
	},
	devtool: PRODUCTION ? false : 'source-map',
	plugins,
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

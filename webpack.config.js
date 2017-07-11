module.exports = {
	entry: ['babel-polyfill', './client/src/index.js'],
	output: {
		filename: 'bundle.js',
		path: __dirname,
		publicPath: '/'
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: "style!css!less"
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}, {
			test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
			loader: 'file?name=[path][name].[ext]'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		proxy: [{
			path: '/api/**/*',
			target: 'http://127.0.0.1:8000'
		}],
		port: 8001,
		contentBase: './',
		historyApiFallback: true
	}
};
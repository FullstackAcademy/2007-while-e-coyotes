const { resolve } = require('path');

module.exports = {
	entry: ['@babel/polyfill', './client/index.js'],
	output: {
		path: __dirname,
		filename: "./server/public/bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".scss"],
	},
	devtool: "source-map",
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.scss$/,
				include: resolve(__dirname, './client/sass'),
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		],
	},
}

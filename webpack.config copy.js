const path = require('path');

module.exports = {
    entry: {
        input: './components/input/index.js',
    },
    output: {
        filename: 'components/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
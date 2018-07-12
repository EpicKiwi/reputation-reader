const path = require("path")

module.exports = {
    mode: "development",
    entry: "./js/app.js",
    output: {
        path: path.resolve(__dirname,"/build"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /.*\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react"]
                    }
                }
            },
            {
                test: /.*\.css/,
                use: ["style-loader","css-loader"]
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: ".",
        overlay: true
    }
}
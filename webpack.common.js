
module.exports = {
    entry: "./src/index.jsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader", // loader is a shorthand for the use property, when only one loader is being utilized.
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader"
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] }
};
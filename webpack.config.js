module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
            },
            {
                test: /\.(glsl|fs|vs)$/,
                exclude: /node_modules/,
                use: "glslify-import-loader",
            },
            {
                test: /\.(glsl|fs|vs)$/,
                exclude: /node_modules/,
                use: "raw-loader"
            },
            {
                test: /\.(glsl|fs|vs)$/,
                exclude: /node_modules/,
                use: "glslify-loader",
            }
        ]
    }
};

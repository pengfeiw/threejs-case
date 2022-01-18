/** @type {import("next").NextConfig} */
const withPlugins = require("next-compose-plugins");
const {merge} = require("webpack-merge");
const webpackconfig = require("./webpack.config");

const IsDevelopment = process.env.NODE_ENV === "development";

const nextconfig = {
    reactStrictMode: true,
    assetPrefix: IsDevelopment ? "" : "/threejs-case",
};

module.exports = withPlugins(
    [],
    {
        ...nextconfig,
        webpack: (config, options) => merge(config, webpackconfig)
    }
);

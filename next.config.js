/** @type {import("next").NextConfig} */
const withPlugins = require("next-compose-plugins");
const {merge} = require("webpack-merge");
const webpackconfig = require("./webpack.config");

const nextconfig = {
    reactStrictMode: true,
};

module.exports = withPlugins(
    [],
    merge(nextconfig, {webpack: webpackconfig})
);

module.exports = {
  plugins: [
    {
      plugin: require("craco-alias"),
      options: {
        baseUrl: "./src",
        source: "jsconfig",
      },
    },
  ],
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};

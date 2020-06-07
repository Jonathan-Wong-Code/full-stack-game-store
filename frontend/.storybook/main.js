const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.(js|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-contexts/register",
    "@storybook/addon-backgrounds/register",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y/register",

    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],

  webpackFinal: async (baseConfig) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    const nextConfig = require("../next.config");

    // Return the altered config
    return { ...nextConfig, ...baseConfig };
  },
};

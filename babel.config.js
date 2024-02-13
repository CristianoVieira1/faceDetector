module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@scenes": ["./src/scenes"],
            "@utils": ["./src/utils"],
            "@types": ["./src/types"],
            "@hooks": ["./src/hooks"],
            "@context": ["./src/context"],
            "@components": ["./src/components"],
            "@routes": ["./src/routes"],
            "@assets": ["./src/assets"],
            "@services": ["./src/services"],
            "@viewModels": ["./src/viewModels"],
          },
        },
      ],
    ],
  };
};

import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>["rules"] = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
//   {
//     test: /\.(js|jsx)$/,
//     exclude: /node_modules/,
//     use: {
//       loader: "babel-loader",
//       options: {
//         presets: ["@babel/preset-env", "@babel/preset-react"],
//       },
//     },
//   },
//   {
//     test: /\.css$/,
//     use: ["style-loader", "css-loader"],
//   },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
 ];

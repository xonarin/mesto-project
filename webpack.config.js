const path = require('path'); // относительный путь от корня
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин обработки html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин очистки сборки перед компиляцией
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/index.js' }, //Точка входа вебпака, главный файл
  output: {
    path: path.resolve(__dirname, 'dist'),  //Куда складывать собранный код
    filename: 'main.js',
      publicPath: ''
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
    module: {
      rules: [ // rules — это массив правил
        // правила для обработки js файлов
        {
          // регулярное выражение, которое ищет все js файлы
          test: /\.js$/,
          // при обработке этих файлов нужно использовать babel-loader
          use: 'babel-loader',
          // исключает папку node_modules, файлы в ней обрабатывать не нужно
          exclude: '/node_modules/'
        },
          // добавили правило для обработки файлов
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource'
        },
          // правило для обработки css файлов
        {
          // применять это правило только к CSS-файлам
          test: /\.css$/,
          // при обработке этих файлов нужно использовать
          // MiniCssExtractPlugin.loader и css-loader
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1}
          },
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ //сборка html
        template: './src/index.html' // путь к файлу index.html
      }),

      new CleanWebpackPlugin(), // очистка старых файлов перед сборкой
      new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]

}

// Archivo de configuración
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// producción
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    // cambiamos el modo de producción
    mode: 'production',
    output: {
        // Limpia la carpeta "dist" antes de crear la build
        clean: true,
        // definimos el nombre del archivo
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [{
                // expresión regular evalúa si un string hace match con la expresión
                // apuntar a todos los archivos HTML del proyecto
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // evita mover los atributos que tenga el HTML como imágenes
                    sources: false
                }
            },
            {
                // regla CSS
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // estilo global
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                // revisamos distintas extensiones de archivos de imágenes
                test: /\.(png|jpg?e|gif)$/,
                loader: 'file-loader',
                options: {
                    // configuramos el cargador de imágenes para evitar la creación de imágenes con hashes
                    esModule: false,
                    name: 'assets/[name].[ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins: [
        // modificamos el plugin instalado
        new HtmlWebpack({
            title: 'Mi Webpack App',
            // filename: 'holamundo.html',
            // Habilitamos que se puedan ver los elementos HTML en dist.
            template: './src/index.html'
        }),
        new MiniCssExtract({
            // al agregar el hash, evitamos que el navegador mantenga en caché el archivo anterior
            filename: '[name].[fullhash].css',
            // filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            // { from: "source", to: "dest" }
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        })
    ]
}
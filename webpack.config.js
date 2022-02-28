// Archivo de configuración
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output: {
        // Limpia la carpeta "dist" antes de crear la build
        clean: true
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
                loader: 'file-loader'
            }
        ]
    },
    optimization: {},
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
            // filename: '[name].[fullhash].css',
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            // { from: "source", to: "dest" }
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        })
    ]
}
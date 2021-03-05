const path = require('path');
const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
    __dirname,
    '..',
    'ui.apps',
    'src',
    'main',
    'content',
    'jcr_root',
    'apps',
    'asset-share-commons',
    'clientlibs'
  );

//entry points manually chosen
const entrypoints = ['vendors~site.bundle.css', 'vendors~site.bundle.js', 'site.bundle.css', 'site.bundle.js'];

module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: BUILD_DIR,

    // path to the clientlib root folder (output)
    clientLibRoot: CLIENTLIB_DIR,

    libs: [
        {
            name: 'clientlib-webcomponents',
            allowProxy: true,
            categories: ['asset-share-commons.webcomponents'],
            serializationFormat: 'xml',
            cssProcessor : ['default:none', 'min:none'],
            jsProcessor: ['default:none', 'min:none'],
            assets: {
                // Copy entrypoint scripts and stylesheets into the respective ClientLib
                // directories (in the order they are in the entrypoints arrays). They
                // will be bundled by AEM and requested from the HTML. The remaining
                // chunks (placed in `resources`) will be loaded dynamically
                js: entrypoints.filter(fileName => fileName.endsWith('.js')),
                css: entrypoints.filter(fileName => fileName.endsWith('.css')),
          
                // Copy all other files into the `resources` ClientLib directory
                resources: {
                  cwd: '.',
                  files: ['**/*.*'],
                  flatten: false,
                  ignore: entrypoints
                }
            }
        }
    ]
};

module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/asset-share-commons/clientlibs",

    libs: [
        {
            name: "clientlib-webcomponents",
            allowProxy: true,
            categories: ["asset-share-commons.webcomponents"],
            serializationFormat: "xml",
            cssProcessor : ["default:none", "min:none"],
            jsProcessor: ["default:none", "min:none"],
            assets: {
                js: [
                    "dist/webcomponents/js/vendors~site.*.js",
                    "dist/webcomponents/js/site.*.js"
                ],
                css: [
                    "dist/webcomponents/css/vendors~site.*.css",
                    "dist/webcomponents/css/site.*.css"
                ],
                resources: {
                    cwd: "./resources",
                    flatten: false,
                    files: ["**/*.*"]
                }
            }
        }
    ]
};


module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/asset-share-commons/clientlibs/clientlib-theme",

    libs: {
        name: "semantic-ui-theme",
        allowProxy: true,
        categories: ["assetshare.semantic-ui.theme"],
        embed: ["asset-share-commons.site.semantic-ui","asset-share-commons.site.semantic-ui.components"],
        serializationFormat: "xml",
        assets: {
            js: [
                "dist/semantic.js"
            ],
            css: [
                "dist/semantic.css"
            ],
            resources: [
                {
                    src: "dist/themes/default/assets/fonts/*",
                    dest: "assets/fonts"
                },
                {
                    src: "dist/themes/light/assets/fonts/*",
                    dest: "assets/fonts"
                }
            ]
        }
    }
};

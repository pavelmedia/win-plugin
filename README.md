# Windy Plugin Template

In:

node_modules\@windycom\plugin-devtools\index.mjs

Change:

const pathOfTheFile = facadeModuleId.replace(/\/[^/]*$/, '');    

to:

const pathOfTheFile = facadeModuleId.replace(/\\[^\\]*$/, '');


Template for development of Windy Plugins.

**Documentation at: [https://docs.windy-plugins.com/](https://docs.windy-plugins.com/)**

# CHANGELOG

-   2.0.0
    -   Completely new version of the plugin system based in Windy client v42+
-   1.0.0
    -   New rollup compiler, no more riot architecture
    -   Updated examples for Windy client v39
-   0.4.0
    -   Added `plugin-data-loader` to the Plugins API
-   0.3.0
    -   Examples moved to examples dir
-   0.2.0
    -   Fixed wrong examples
-   0.1.1
    -   Initial version of this repo

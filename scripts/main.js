const cool = extendContent(Router, "cool", {});
cool.buildType = () => extendContent(Router.RouterBuild, cool, {
    updateTile() {
        this.super$updateTile();
        this.kill();
    }
});

require("turbines");
require("unit-gun");
require("matter-compressor");
require("geothermal-boiler");

const boost = 0.5;
const attribute = Attribute.heat;

const geothermalBoiler = extendContent(GenericCrafter, "geothermal-boiler", {
    drawPlace(x, y, rotation, valid) {
        this.drawPlaceText(Core.bundle.formatFloat("bar.efficiency", Math.min(1, this.sumAttribute(attribute, x, y) * boost) * 100, 1), x, y, valid)
    },
    canPlaceOn(tile) {
        return tile.getLinkedTilesAs(this, this.tempTiles).sumf(floatf((other) => {
            return other.floor().attributes.get(Attribute.heat)
        })) > 0.01;
    },
    setBars() {
        this.super$setBars();
        this.bars.add("matter", func((entity) => {
            return new Bar(
                prov(() => Core.bundle.formatFloat("bar.efficiency", Math.min(1, this.sumAttribute(attribute, entity.tile.x, entity.tile.y) * boost) * 100, 1)),
                prov(() => Pal.ammo),
                floatp(() => entity.efficiency())
            ).blink(Color.white)
        }));
    },
    setStats() {
        this.super$setStats();
        this.stats.add(BlockStat.tiles, Attribute.heat);
    },
    update(tile) {
        Lightning.create(Team.derelict, Color.valueOf("#ffffff"), 7.5, tile.drawx(), tile.drawy(), Mathf.random(0, 360), Mathf.random(5, 20));
    }
})

geothermalBoiler.buildType = () => {
    return extend(GenericCrafter.GenericCrafterBuild, {
        efficiency() {
            return Math.min(1, this.tile.block().sumAttribute(attribute, this.tile.x, this.tile.y) * boost) * this.super$efficiency();
        }
    })
}

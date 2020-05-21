const steamGenerator = extendContent(PowerGenerator,"steam-generator",{
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine, outputs water.",
  update(tile) {
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      tile.entity.productionEfficiency += tile.entity.liquids.total() / this.liquidCapacity * 0.03;
    }
    tile.entity.productionEfficiency -= 0.02;
    tile.entity.productionEfficiency = Mathf.clamp(tile.entity.productionEfficiency,0,1);
  }
})

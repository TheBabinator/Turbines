const steamGenerator = extendContent(PowerGenerator, "steam-generator", {
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine, outputs water.",
  update(tile) {
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      tile.entity.productionEfficiency += tile.entity.liquids().get("steam") / tile.entity.liquidCapacity * 0.02;
    }
    tile.entity.productionEfficiency -= 0.01;
    tile.entity.productionEfficiency = Mathf.clamp(tile.entity.productionEfficiency,0,1);
  }
})

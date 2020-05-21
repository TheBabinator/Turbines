const steamGenerator = extendContent(PowerGenerator,"steam-generator",{
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine and generate power. Will release steam regardless of whether or not there is sufficient pressure to spin the turbine.",
  update(tile) {
    // heat is a gradual boost in production up to x3
    // this is supposed to be an incentive to use the turbine and not the stock generator
    if (tile.entity.heat == null) tile.entity.heat = 0.0;
    // efficiency is the raw gain of power
    if (tile.entity.efficiency == null) tile.entity.efficiency = 0.0;

    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      tile.entity.heat += tile.entity.liquids.total() / this.liquidCapacity * 0.00011;
      tile.entity.efficiency += tile.entity.liquids.total() / this.liquidCapacity * 0.03;
    }
    tile.entity.heat -= 0.0001
    tile.entity.heat = Mathf.clamp(tile.entity.heat,0,1)
    tile.entity.efficiency -= 0.02;
    tile.entity.efficiency = Mathf.clamp(tile.entity.efficiency,0,1);
    tile.entity.productionEfficiency = tile.entity.efficiency * (1 + tile.entity.heat * 2)
  }
})

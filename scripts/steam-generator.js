const steamGenerator = extendContent(PowerGenerator,"steam-generator",{
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine and generate power. Will release steam regardless of whether or not there is sufficient pressure to spin the turbine.",
  update(tile) {
    entity = tile.ent();
    // heat is a gradual boost in production up to x3
    // this is supposed to be an incentive to use the turbine and not the stock generator
    if (entity.heat == null) entity.heat = 0.0;
    // efficiency is the raw gain of power
    if (entity.efficiency == null) entity.efficiency = 0.0;

    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      entity.heat += tile.entity.liquids.total() / this.liquidCapacity * 0.00011;
      entity.efficiency += tile.entity.liquids.total() / this.liquidCapacity * 0.03;
    }
    entity.heat -= 0.0001
    entity.heat = Mathf.clamp(entity.heat,0,1)
    entity.efficiency -= 0.02;
    entity.efficiency = Mathf.clamp(entity.efficiency,0,1);
    tile.entity.productionEfficiency = entity.efficiency * (1 + entity.heat * 2)
  }
})

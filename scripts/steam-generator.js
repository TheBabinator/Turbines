const steamGenerator = extendContent(PowerGenerator,"steam-generator",{
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine and generate power. Will release steam regardless of whether or not there is sufficient pressure to spin the turbine.",
  update(tile) {
    // heat is a gradual boost in production
    if (this.heat == null) this.heat = 0.0;
    // efficiency is the raw gain of power
    if (this.efficiency == null) this.efficiency = 0.0;
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      this.heat += tile.entity.liquids.total() / this.liquidCapacity * 0.0011;
      this.efficiency += tile.entity.liquids.total() / this.liquidCapacity * 0.03;
    }
    this.heat -= 0.001
    this.heat = Mathf.clamp(this.heat,0,1)
    this.efficiency -= 0.02;
    this.efficiency = Mathf.clamp(this.efficiency,0,1);
    tile.entity.productionEfficiency = this.efficiency * (1 + this.heat)
  }
})

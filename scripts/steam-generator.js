const steamGenerator = extendContent(PowerGenerator, "steam-generator", {
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine, outputs water.",
  update(tile) {
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      tile.entity.productionEfficiency = tile.items.get(tile.entity.cons.get(ConsumeType.item).items[0].item)/this.entity.itemCapacity;
    } else {
      tile.entity.productionEfficiency = 0;
    }
  }
})

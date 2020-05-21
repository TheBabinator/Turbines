const steamGenerator = extendContent(PowerGenerator, "steam-generator", {
  update(tile) {
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
      tile.entity.productionEfficiency = items.get(tile.entity.cons.get(ConsumeType.item).items[0].item)/this.entity.itemCapacity;
    } else {
      tile.entity.productionEfficiency = 0;
    }
  }
})

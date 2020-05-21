const steamGenerator = extendContent(PowerGenerator, "steam-generator", {
  name: "Steam Turbine",
  description: "Uses high pressure steam to spin a turbine, outputs water.",
  tile.entity.speed: 0,
  update(tile) {
    if (tile.entity.cons.valid()) {
      tile.entity.cons.trigger();
        tile.entity.tile.entity.speed += 0.01;
    } else {
      tile.tile.entity.speed -= 0.01;
    }
    tile.entity.speed = Mathf.clamp(tile.entity.speed,0,1);
    tile.entity.productionEfficiency = tile.entity.speed;
  }
})

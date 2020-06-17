const turbineGenerator = prov(() => {
  entity = extend(PowerGenerator.GeneratorEntity,{
    getTurbineSpeed() {
      return this._turbineSpeed;
    },
    setTurbineSpeed(value) {
      this._turbineSpeed = value;
    },
    getTurbineEfficiency() {
      return this._turbineEfficiency;
    },
    setTurbineEfficiency(value) {
      this._turbineEfficiency = value;
    },
    getTurbineRotation() {
      return this._turbineRotation;
    },
    setTurbineRotation(value) {
      this._turbineRotation = value;
    }
  });
  return entity;
});

const steamGenerator = extendContent(PowerGenerator,"steam-generator",{
  update(tile) {
    entity = tile.entity;
    if (entity.getTurbineSpeed() == null) entity.setTurbineSpeed(0);
    if (entity.getTurbineEfficiency() == null) entity.setTurbineEfficiency(0);
    if (entity.cons.valid()) {
      entity.cons.trigger();
      entity.setTurbineSpeed(entity.getTurbineSpeed() + entity.liquids.total() / this.liquidCapacity * 0.03);
      entity.setTurbineEfficiency(entity.getTurbineEfficiency() + entity.liquids.total() / this.liquidCapacity * 0.00014);
    } else {
      entity.setTurbineSpeed(entity.getTurbineSpeed() - 0.01);
    }
    entity.setTurbineSpeed(entity.getTurbineSpeed() - 0.02);
    entity.setTurbineSpeed(Mathf.clamp(entity.getTurbineSpeed(),0,1));
    entity.setTurbineEfficiency(entity.getTurbineEfficiency() - 0.0001);
    entity.setTurbineEfficiency(Mathf.clamp(entity.getTurbineEfficiency(),0,1));
    entity.productionEfficiency = entity.getTurbineSpeed() * (0.8 + entity.getTurbineEfficiency() * 1.2);
    if (Mathf.chance(entity.liquids.total() / this.liquidCapacity * 0.2)) {
      Effects.effect(Fx.steam,tile.drawx(),tile.drawy(),2);
    }
  }
});

steamGenerator.entityType = turbineGenerator;

const steamReactor = extendContent(PowerGenerator,"steam-reactor",{
  load() {
    this.super$load();
    this.baseRegion = Core.atlas.find(this.name + "-bottom");
    this.turbineRegion = Core.atlas.find(this.name + "-turbine");
    this.topRegion = Core.atlas.find(this.name);
  },
  generateIcons() {
    return [
      Core.atlas.find(this.name + "-bottom"),
      Core.atlas.find(this.name + "-turbine"),
      Core.atlas.find(this.name)
    ]
  },
  draw(tile) {
    entity = tile.entity;
    if (entity.getTurbineRotation() == null) entity.setTurbineRotation(0);
    Draw.rect(this.baseRegion,tile.drawx(),tile.drawy());
    Draw.rect(this.turbineRegion,tile.drawx(),tile.drawy(),entity.getTurbineRotation());
    Draw.rect(this.topRegion,tile.drawx(),tile.drawy());
  },
  update(tile) {
    entity = tile.entity;
    if (entity.getTurbineSpeed() == null) entity.setTurbineSpeed(0);
    if (entity.getTurbineEfficiency() == null) entity.setTurbineEfficiency(0);
    if (entity.getTurbineRotation() == null) entity.setTurbineRotation(0);
    for (i = 0; i < 10; i++) {
      if (entity.cons.valid()) {
        entity.cons.trigger();
        entity.setTurbineSpeed(entity.getTurbineSpeed() + entity.liquids.total() / this.liquidCapacity * 0.002);
        entity.setTurbineEfficiency(entity.getTurbineEfficiency() + entity.liquids.total() / this.liquidCapacity * 0.0002);
      }
    }
    entity.setTurbineSpeed(entity.getTurbineSpeed() - Mathf.pow(entity.getTurbineSpeed(),2) * 0.01);
    entity.setTurbineSpeed(Mathf.clamp(entity.getTurbineSpeed(),0,2));
    entity.setTurbineEfficiency(entity.getTurbineEfficiency() - 0.0001);
    entity.setTurbineEfficiency(Mathf.clamp(entity.getTurbineEfficiency(),0,1));
    entity.productionEfficiency = entity.getTurbineSpeed() * (0.8 + entity.getTurbineEfficiency() * 1.2);
    entity.setTurbineRotation((entity.getTurbineRotation() + entity.getTurbineSpeed() * 6) % 360);
    if (Mathf.chance(entity.liquids.total() / this.liquidCapacity * 0.2)) {
      Effects.effect(Fx.steam,tile.drawx() + Mathf.range(2),tile.drawy() + Mathf.range(2),4);
    }
    if (Mathf.chance(Mathf.clamp(entity.getTurbineSpeed()-1,0,1) * 0.001)) {
      fuel = entity.getTurbineSpeed();
      if (fuel > 0.8) {
        Effects.shake(4,8,tile.x,tile.y);
        Effects.effect(Fx.nuclearShockwave,tile.drawx(),tile.drawy(),0);
        for (i = 0; i < 80; i++) {
          Effects.effect(Fx.steam,tile.drawx() + Mathf.range(16),tile.drawy() + Mathf.range(16),fuel*16);
        }
        Damage.damage(tile.x,tile.y,fuel*20,fuel*3200);
        entity.kill();
      }
    }
  }
});

steamReactor.entityType = turbineGenerator;

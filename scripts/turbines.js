const turbineGenerator = prov(() => {
  const entity = extend(PowerGenerator.GeneratorEntity,{
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
    if (entity.cons.valid()) {
      entity.cons.trigger();
      entity.setTurbineSpeed(entity.getTurbineSpeed() + entity.liquids.total() / this.liquidCapacity * 0.002);
      entity.setTurbineEfficiency(entity.getTurbineEfficiency() + entity.liquids.total() / this.liquidCapacity * 0.0002);
    } else {
      entity.setTurbineSpeed(entity.getTurbineSpeed() - 0.0005);
    }
    entity.setTurbineSpeed(entity.getTurbineSpeed() - 0.001);
    entity.setTurbineSpeed(Mathf.clamp(entity.getTurbineSpeed(),0,1));
    entity.setTurbineEfficiency(entity.getTurbineEfficiency() - 0.0001);
    entity.setTurbineEfficiency(Mathf.clamp(entity.getTurbineEfficiency(),0,1));
    entity.productionEfficiency = entity.getTurbineSpeed() * (0.8 + entity.getTurbineEfficiency() * 1.2);
    entity.setTurbineRotation((entity.getTurbineRotation() + entity.getTurbineSpeed() * 16) % 360);
    if (Mathf.chance(entity.liquids.total() / this.liquidCapacity * 0.2)) {
      Effects.effect(Fx.steam,tile.drawx() + Mathf.range(2),tile.drawy() + Mathf.range(2),4);
    }
    if (Mathf.chance(entity.liquids.total() / this.liquidCapacity * 0.0001)) {
      print("kaboom");
    }
  }
});

steamReactor.entityType = turbineGenerator;

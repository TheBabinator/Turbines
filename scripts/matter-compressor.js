const matterCompressor = extendContent(GenericCrafter,"matter-compressor",{
  load() {
    this.super$load();
    this.baseRegion = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find(this.name + "-lights");
  },
  setBars() {
    this.super$setBars();
    this.bars.add("matter",func((entity) => {
      return new Bar("block.matter",Pal.accent,floatp(() => Mathf.clamp(entity.getMatter()/60,0,1))).blink(Color.white)
    }));
  },
  acceptItem(item,tile,source) {
    entity = tile.ent();
    return entity.items.get(item) < entity.block.itemCapacity;
  },
  update(tile) {
    entity = tile.ent();
    if ((entity.getMatter() < 60) && entity.items.total() > 0) {
      entity.addMatter(entity.items.take().cost)
    }
    if ((entity.getMatter() >= 60) && entity.cons.valid() && entity.progress != 1) {
      entity.subMatter(60);
      entity.progress = 1;
    } else {
      entity.progress = 0;
    }
    this.super$update(tile);
  },
  draw(tile) {
    entity = tile.ent();
    Draw.rect(this.baseRegion,tile.drawx(),tile.drawy());
    Draw.alpha(entity.warmup*(Mathf.clamp(entity.getMatter()/64,0,1)*Mathf.sin(Time.time()*0.1)));
    Draw.rect(this.topRegion,tile.drawx(),tile.drawy());
    Draw.reset();
  }
});

matterCompressor.entityType = prov(() => {
  return extend(GenericCrafter.GenericCrafterEntity,{
    getMatter() {
      if (this._matter == null) this._matter = 0;
      return this._matter;
    },
    setMatter(value) {
      if (this._matter == null) this._matter = 0;
      this._matter = value;
    },
    addMatter(value) {
      if (this._matter == null) this._matter = 0;
      this._matter += value;
    },
    subMatter(value) {
      if (this._matter == null) this._matter = 0;
      this._matter -= value;
    }
  })
})

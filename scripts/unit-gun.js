const unitBullet = extend(BasicBulletType,{
  spawnUnit(b,x,y) {
    if (Vars.net.client()) return;
    unit = UnitTypes.dagger.create(b.team);
    unit.set(x,y);
    unit.add();
  },
  hit(b,x,y) {
    this.spawnUnit(b,x,y);
  },
  despawned(b) {
    this.spawnUnit(b,b.getX(),b.getY())
  }
})

unitBullet.bulletWidth = 8;
unitBullet.bulletHeight = 8;
unitBullet.damage = 12;
unitBullet.splashDamage = 4;
unitBullet.splashDamageRadius = 20;
unitBullet.ammoMultiplier = 1;
unitBullet.lifetime = 180;

const unitGun = extendContent(ItemTurret,"unit-gun",{});
unitGun.ammo(Items.silicon,unitBullet);

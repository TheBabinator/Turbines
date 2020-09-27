const steamGenerator = extendContent(PowerGenerator, "advanced-steam-generator", {});
steamGenerator.buildType = () => extendContent(PowerGenerator.GeneratorBuild, steamGenerator, {
    getTurbineSpeed() {
        return this._turbineSpeed;
    },
    setTurbineSpeed(value) {
        this._turbineSpeed = value;
    },
    getTurbineRotation() {
        return this._turbineRotation;
    },
    setTurbineRotation(value) {
        this._turbineRotation = value;
    },
    updateTile() {
        this.super$updateTile();
        let speed = this.getTurbineSpeed();
        let rotation = this.getTurbineRotation();
        if (speed != speed) speed = 0;
        if (rotation != speed) rotation = 0;
        if (this.cons.valid()) {
            this.cons.trigger();
            speed = speed + ((this.liquids.total() / this.block.liquidCapacity) * 0.02);
            print(this.liquids.total())
            print(this.block.liquidCapacity)
        }
        speed = speed - 0.01;
        speed = Mathf.clamp(speed, 0, 1);
        rotation = rotation + speed;
        this.setTurbineSpeed(speed);
        this.setTurbineRotation(rotation);
        this.productionEfficiency = speed;
        if (Mathf.chance((this.liquids.total() / this.block.liquidCapacity) * 0.2)) {
            Fx.steam.at(this.tile.drawx() + Mathf.range(2), this.tile.drawy() + Mathf.range(2));
        }
    }
});

const steamReactor = extendContent(PowerGenerator, "steam-reactor", {});

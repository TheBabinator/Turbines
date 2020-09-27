const steamGenerator = extendContent(PowerGenerator, "advanced-steam-generator", {
    icons() {
        return [
            Core.atlas.find("turbines-advanced-steam-generator"),
            Core.atlas.find("turbines-advanced-steam-generator-turbine0"),
            Core.atlas.find("turbines-advanced-steam-generator-cap")
        ];
    }
});

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
    draw() {
        Draw.rect(Core.atlas.find("turbines-advanced-steam-generator"), this.tile.drawx(), this.tile.drawy());
        Draw.rect(Core.atlas.find("turbines-advanced-steam-generator-turbine0"), this.tile.drawx(), this.tile.drawy(), this.getTurbineRotation() * -360);
        Draw.rect(Core.atlas.find("turbines-advanced-steam-generator-cap"), this.tile.drawx(), this.tile.drawy());
    },
    updateTile() {
        this.super$updateTile();
        var speed = this.getTurbineSpeed();
        var rotation = this.getTurbineRotation();
        if (speed != speed) speed = 0;
        if (rotation != rotation) rotation = 0;
        if (this.cons.valid()) {
            speed = speed + ((this.liquids.total() / this.block.liquidCapacity) * 0.02);
        }
        speed = speed - 0.01;
        speed = Mathf.clamp(speed, 0, 1);
        rotation = (rotation + (speed * 0.01)) % 1;
        this.setTurbineSpeed(speed);
        this.setTurbineRotation(rotation);
        this.productionEfficiency = speed;
        if (Mathf.chance((this.liquids.total() / this.block.liquidCapacity) * 0.2)) {
            Fx.steam.at(this.tile.drawx() + Mathf.range(2), this.tile.drawy() + Mathf.range(2));
        }
    }
});

const steamReactor = extendContent(PowerGenerator, "steam-reactor", {
    icons() {
        return [
            Core.atlas.find("turbines-steam-reactor-bottom"),
            Core.atlas.find("turbines-steam-reactor-turbine"),
            Core.atlas.find("turbines-steam-reactor")
        ];
    }
});

steamReactor.buildType = () => extendContent(PowerGenerator.GeneratorBuild, steamReactor, {
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
    draw() {
        Draw.rect(Core.atlas.find("turbines-steam-reactor-bottom"), this.tile.drawx(), this.tile.drawy());
        Draw.rect(Core.atlas.find("turbines-steam-reactor-turbine"), this.tile.drawx(), this.tile.drawy(), this.getTurbineRotation() * -360);
        Draw.rect(Core.atlas.find("turbines-steam-reactor"), this.tile.drawx(), this.tile.drawy());
    },
    updateTile() {
        this.super$updateTile();
        var speed = this.getTurbineSpeed();
        var rotation = this.getTurbineRotation();
        if (speed != speed) speed = 0;
        if (rotation != rotation) rotation = 0;
        if (this.cons.valid()) {
            speed = speed + ((this.liquids.total() / this.block.liquidCapacity) * 0.0015);
        }
        speed = speed - 0.001;
        speed = Mathf.clamp(speed, 0, 1);
        rotation = (rotation + (speed * 0.05)) % 1;
        this.setTurbineSpeed(speed);
        this.setTurbineRotation(rotation);
        this.productionEfficiency = speed;
        if (Mathf.chance((this.liquids.total() / this.block.liquidCapacity) * 0.2)) {
            Fx.steam.at(this.tile.drawx() + Mathf.range(2), this.tile.drawy() + Mathf.range(2));
        }
    }
});

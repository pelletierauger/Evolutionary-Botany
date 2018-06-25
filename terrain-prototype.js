    let Terrain = function() {
        this.amountOfHills = 5;
        // A float between 0 and 1, 0 being the top of the scene, 1 being the bottom.
        this.horizon = 0.5;
        this.width = 1300;
        this.depth = 500;
        this.unit = 10;
        this.hills = [];
        scene.terrain = this;
        // this.makeHills();
    };

    Terrain.prototype.makeHills = function() {
        this.height = sketch.height;
        for (let i = 0; i < this.amountOfHills; i++) {
            this.hills.push(new Hill(i, this));
        }
    };

    let Hill = function(ind, parent) {
        this.parent = parent;
        let height = parent.height * parent.horizon;
        height = sketch.map(ind, 0, parent.amountOfHills, height, 0);
        this.basePoint = { x: -parent.width, y: this.parent.depth };
        this.points = [this.basePoint];

        for (let x = 0; x < this.parent.width * 2; x += this.parent.unit) {
            let y = (sketch.noise(x * 0.0009, ind) * -500) - height;
            this.points.push({ x: x - this.parent.width, y: y });
        }
        this.points.push({ x: parent.width, y: this.parent.depth });


        scene.hills.push(this);
    };

    Hill.prototype.gatherShapes = function() {
        // console.log("Yeah!");
        scene.registerPolygon(this.points, { r: 0, g: 0, b: 0, a: 50 });
        for (let i = 0; i <  this.points.length; i++) {
            // scene.registerEllipse(this.points[i].x, this.points[i].y);
        }
    };

    let terrain = new Terrain();
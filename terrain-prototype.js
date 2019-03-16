    let Terrain = function() {
        this.amountOfHills = 20;
        // A float between 0 and 1, 0 being the top of the scene, 1 being the bottom.
        this.horizon = 0.5;
        // A float between 0 and 1, 0 being 0 on the y axis, and 1 being sketch.height;
        this.bottom = 0.1;
        this.width = 1300;
        this.depth = 1000;
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
        this.ind = ind;
        let scalar = sketch.map(this.ind, 4, 0, 0, 1);
        let top = (parent.height * parent.horizon) * scalar;
        let bottom = (parent.height * parent.bottom);
        let baseHeight = sketch.map(ind, 0, parent.amountOfHills, -bottom, top);
        this.basePoint = { x: -parent.width, y: this.parent.depth };
        this.points = [this.basePoint];

        for (let x = 0; x < this.parent.width * 2; x += this.parent.unit) {
            let y = (sketch.noise(x * 0.0009, ind) * -500) - baseHeight;
            this.points.push({ x: x - this.parent.width, y: y });
        }
        this.points.push({ x: parent.width, y: this.parent.depth });


        scene.hills.push(this);
    };

    Hill.prototype.gatherShapes = function() {
        // console.log("Yeah!");
        // 103, 52, 152
        let r = sketch.map(this.ind, 9, 0, 0, 103);
        let g = sketch.map(this.ind, 9, 0, 0, 52);
        let b = sketch.map(this.ind, 9, 0, 0, 152);
        scene.registerPolygon(this.points, { r: r, g: g, b: b, a: 255 });
        for (let i = 0; i <  this.points.length; i++) {
            // scene.registerEllipse(this.points[i].x, this.points[i].y);
        }
    };

    let terrain = new Terrain();
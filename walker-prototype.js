let walkers = [];

let Walker = function(parent) {
    this.parent = parent;
    this.speed = 0.05;
    this.segmentCompletion = 0;
    this.arrayPosition = walkers.length;
    this.active = true;
    walkers.push(this);
};

Walker.prototype.sing = function() {
    // let osc = song.getFrequency(this.v.freq);
    let octave = sketch.random(ranges);
    let whichNote = sketch.random(notes);
    let frequency = Tonal.Note.freq(whichNote + "" + octave);
    //     socket.emit('note', sketch.random([110, 220, 440, 660, 880]));
    socket.emit('note', frequency);
    this.hasSung = true;
};

Walker.prototype.walk = function() {
    this.hasSung = false;
    let d = sketch.dist(this.parent.x0, this.parent.y0, this.parent.x1, this.parent.y1);
    let m = sketch.map(d, 0, 100, 10, 1);
    m = sketch.constrain(m, 1, 10);
    let s = this.speed * m;
        s = this.speed;
    this.segmentCompletion = Math.min(this.segmentCompletion + s, 1);
    if (this.segmentCompletion == 1 && this.parent.children.length >= 1) {
        if (this.parent.children.length > 1) {
            this.sing();
            for (let i = 1; i < this.parent.children.length; i++) {
                let w = new Walker(this.parent.children[i]);
            }
        }
        this.parent = this.parent.children[0];
        this.segmentCompletion = 0;
    } else if (this.segmentCompletion == 1 && this.parent.leaf) {
        this.parent = this.parent.leaf.root;
        this.sing();
        this.segmentCompletion = 0;
    } else if (this.segmentCompletion == 1) {
        // this.active = false;
        this.sing();
        this.active = false;
    }
};

Walker.prototype.show = function() {
    // if (this.active) {
    let x = sketch.lerp(this.parent.x0, this.parent.x1, this.segmentCompletion);
    let y = sketch.lerp(this.parent.y0, this.parent.y1, this.segmentCompletion);
    let size = (this.hasSung) ? 20 : 10;
    sketch.ellipse(x, y, size);
    if (!this.active) {
        for (let i = 0; i < walkers.length; i++) {
            if (walkers[i] === this) {
                walkers.splice(i, 1);
            }
        }
    }
};
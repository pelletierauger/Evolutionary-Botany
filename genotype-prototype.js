let Genotype = function() {
    this.geneSequence = this.createRandomGeneSequence();
    this.geneInterpretation = this.interpretGeneSequence(this.geneSequence);
};

Genotype.prototype.createRandomGeneSequence = function() {
    let g = {};
    // Energy
    g.initialEnergy = Math.random();
    g.energyLoss = Math.random();
    g.branchGrowthCost = Math.random();
    g.branchingCost = Math.random();

    // Branching struture
    g.branchGrowth = Math.random();
    g.branchingAngle = Math.random();
    g.branchingProbability = Math.random();
    g.branchingFrequencyLeft = Math.random();
    g.branchingFrequencyRight = Math.random();
    g.branchingOffsetLeft = Math.random();
    g.branchingOffsetRight = Math.random();
    g.leafingProbability = Math.random();
    g.branchingAngleFrequencyScalar = Math.random();

    // Leaf structure
    g.petioleSegmentGrowth = Math.random();
    g.petioleMaxBranchings = Math.random();
    g.petioleMaxSegmentLength = Math.random();
    g.petioleSegmentsToFoliole = Math.random();
    g.petioleSegmentGrowthCost = Math.random();
    g.petioleBranchingCost = Math.random();
    g.petioleMaxAngleDelta = Math.random();
    g.petioleAngleGrowth = Math.random();
    g.petioleBranchingProbability = Math.random();
    g.folioleProbability = Math.random();
    g.petioleBranchingFrequencyLeft = Math.random();
    g.petioleBranchingFrequencyRight = Math.random();
    g.petioleBranchingOffsetLeft = Math.random();
    g.petioleBranchingOffsetRight = Math.random();
    g.petioluleDepth = Math.random();
    g.petioleTerminalFoliole = Math.random();
    g.petioleMaxLeafletAmount = Math.random();

    g.maxKnotsLevel0 = Math.random();
    g.maxKnotsLevel1 = Math.random();
    g.maxKnotsLevel2 = Math.random();
    g.maxKnotsLevel3 = Math.random();
    g.maxKnotsLevel4 = Math.random();
    g.maxKnotsLevel5 = Math.random();

    g.petioleMaxSegmentLengthLevel0 = Math.random();
    g.petioleMaxSegmentLengthLevel1 = Math.random();
    g.petioleMaxSegmentLengthLevel2 = Math.random();
    g.petioleMaxSegmentLengthLevel3 = Math.random();
    g.petioleMaxSegmentLengthLevel4 = Math.random();
    g.petioleMaxSegmentLengthLevel5 = Math.random();

    g.folioleVeinAmount = Math.random();
    g.maxFolioleVeinLength = Math.random();
    g.maxFolioleWidth = Math.random();
    g.folioleVeinGrowth = Math.random();
    g.folioleExtenderGrowth = Math.random();

    // folioleHighestPoint is a float between zero and one.
    // If folioleHighestPoint == 0, there is no highest point
    g.folioleHighestPoint = Math.random();

    return g;
};

Genotype.prototype.interpretGeneSequence = function(g) {
    // Energy
    let i = Object.assign({}, g);

    i.initialEnergy *= 60;
    i.energyLoss *= 2;
    i.branchGrowthCost *= 0.001;
    i.branchingCost = 0.02;

    // Branching struture
    i.branchGrowth *= 2;
    i.branchingAngle *= Math.PI * 0.25;
    i.branchingProbability *= 0.5;
    i.branchingFrequencyLeft = Math.floor(i.branchingFrequencyLeft * 10);
    i.branchingFrequencyRight = Math.floor(i.branchingFrequencyRight * 10);
    i.branchingOffsetLeft = Math.floor(i.branchingOffsetLeft * 4);
    i.branchingOffsetRight = Math.floor(i.branchingOffsetRight * 4);
    i.leafingProbability *= 1;
    i.branchingAngleFrequencyScalar = (i.branchingAngleFrequencyScalar * 20) - 10;

    // Leaf structure
    i.petioleSegmentGrowth *= 0.1;
    i.petioleMaxBranchings *= 0.01;
    i.petioleMaxSegmentLength *= 40;
    i.petioleSegmentsToFoliole *= 4;
    i.petioleSegmentGrowthCost *= 0.01;
    i.petioleBranchingCost *= 0.01;
    i.petioleMaxAngleDelta *= Math.PI * 0.15;
    i.petioleAngleGrowth *= 0.01;
    i.petioleBranchingProbability *= 1;
    i.folioleProbability *= 0.25;
    i.petioleBranchingFrequencyLeft = Math.floor(i.petioleBranchingFrequencyLeft * 6);
    i.petioleBranchingFrequencyRight = Math.floor(i.petioleBranchingFrequencyRight * 6);
    i.petioleBranchingOffsetLeft = Math.floor(i.petioleBranchingOffsetLeft * 4);
    i.petioleBranchingOffsetRight = Math.floor(i.petioleBranchingOffsetRight * 4);
    i.petioluleDepth = Math.floor(i.petioluleDepth * 3);
    i.petioleTerminalFoliole = (i.petioleTerminalFoliole < 0.5) ? true : false;
    i.petioleMaxLeafletAmount = Math.floor(i.petioleMaxLeafletAmount * 10);;

    i.maxKnotsLevel0 = Math.floor(i.maxKnotsLevel0 * 5);
    i.maxKnotsLevel1 = Math.floor(i.maxKnotsLevel1 * 5);
    i.maxKnotsLevel2 = Math.floor(i.maxKnotsLevel2 * 5);
    i.maxKnotsLevel3 = Math.floor(i.maxKnotsLevel3 * 5);
    i.maxKnotsLevel4 = Math.floor(i.maxKnotsLevel4 * 5);
    i.maxKnotsLevel5 = Math.floor(i.maxKnotsLevel5 * 5);

    i.petioleMaxSegmentLengthLevel0 = Math.floor(i.petioleMaxSegmentLengthLevel0 * 10);
    i.petioleMaxSegmentLengthLevel1 = Math.floor(i.petioleMaxSegmentLengthLevel1 * 10);
    i.petioleMaxSegmentLengthLevel2 = Math.floor(i.petioleMaxSegmentLengthLevel2 * 10);
    i.petioleMaxSegmentLengthLevel3 = Math.floor(i.petioleMaxSegmentLengthLevel3 * 10);
    i.petioleMaxSegmentLengthLevel4 = Math.floor(i.petioleMaxSegmentLengthLevel4 * 10);
    i.petioleMaxSegmentLengthLevel5 = Math.floor(i.petioleMaxSegmentLengthLevel5 * 10);

    i.folioleVeinAmount = 4 + Math.floor(i.folioleVeinAmount * 40);
    i.maxFolioleVeinLength = 1 + Math.floor(i.maxFolioleVeinLength * 40);
    i.maxFolioleWidth *= 40;
    i.folioleVeinGrowth *= 2;
    i.folioleExtenderGrowth *= 1;

    // folioleHighestPoint is a float between zero and one.
    // If folioleHighestPoint == 0, there is no highest point
    i.folioleHighestPoint *= 0.25;

    return i;
};
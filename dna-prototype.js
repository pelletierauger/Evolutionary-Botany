let DNA = function() {
    // Energy
    this.initialEnergy = 30;
    this.energyLoss = 0.9;
    this.branchGrowthCost = 0.001;
    this.branchingCost = 0.02;

    // Branching struture
    this.branchGrowth = 0.2;
    this.branchingAngle = Math.PI * 0.2;
    this.branchingProbability = 0.029;
    this.branchingFrequencyLeft = 4;
    this.branchingFrequencyRight = 4;
    this.branchingOffsetLeft = 0;
    this.branchingOffsetRight = 0;
    this.leafingProbability = 1;

    // Leaf structure
    this.petioleSegmentGrowth = 0.1;
    this.petioleMaxBranchings = 0.01;
    this.petioleMaxSegmentLength = 40;
    this.petioleSegmentsToFoliole = 4;
    this.petioleSegmentGrowthCost = 0.01;
    this.petioleBranchingCost = 0.01;
    this.petioleMaxAngleDelta = Math.PI * 0.15;
    this.petioleAngleGrowth = 0.01;
    this.petioleBranchingProbability = 1;
    this.folioleProbability = 0.25;
    this.petioleBranchingFrequencyLeft = 4;
    this.petioleBranchingFrequencyRight = 4;
    this.petioleBranchingOffsetLeft = 0;
    this.petioleBranchingOffsetRight = 0;
    this.petioluleDepth = 1;
    this.petioleTerminalFoliole = true;
    this.petioleMaxLeafletAmount = 10;

    this.maxKnotsLevel0 = 1;
    this.maxKnotsLevel1 = 20;
    this.maxKnotsLevel2 = 3;
    this.maxKnotsLevel3 = 5;
    this.maxKnotsLevel4 = 2;
    this.maxKnotsLevel5 = 2;

    this.petioleMaxSegmentLengthLevel0 = 10;
    this.petioleMaxSegmentLengthLevel1 = 0;
    this.petioleMaxSegmentLengthLevel2 = 1;
    this.petioleMaxSegmentLengthLevel3 = 2;
    this.petioleMaxSegmentLengthLevel4 = 2;
    this.petioleMaxSegmentLengthLevel5 = 2;

    this.folioleVeinAmount = 20;
    this.maxFolioleVeinLength = 20;
    this.maxFolioleWidth = 20;
    this.folioleVeinGrowth = 0.1;
    this.folioleExtenderGrowth = 0.5;

    // folioleHighestPoint is a float between zero and one.
    // If folioleHighestPoint == 0, there is no highest point
    this.folioleHighestPoint = 0.25;
};
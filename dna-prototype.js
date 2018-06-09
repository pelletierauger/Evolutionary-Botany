let DNA = function() {
    this.initialEnergy = 30;
    this.energyLoss = 0.9;
    this.branchGrowth = 0.1;
    this.branchGrowthCost = 0.01;
    this.branchingAngle = Math.PI * 0.25;
    this.branchingCost = 0.02;
    this.branchingProbability = 0.25;
    this.branchingFrequencyLeft = 6;
    this.branchingFrequencyRight = 6;
    this.branchingOffsetLeft = 0;
    this.branchingOffsetRight = 0;
};
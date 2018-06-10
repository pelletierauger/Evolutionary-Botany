let DNA = function() {
    this.initialEnergy = 30;
    this.energyLoss = 0.9;
    this.branchGrowth = 0.1;
    this.branchGrowthCost = 0.01;
    this.branchingAngle = Math.PI * 0.5;
    this.branchingCost = 0.02;
    this.branchingProbability = 0.25;
    this.branchingFrequencyLeft = 9;
    this.branchingFrequencyRight = 9;
    this.branchingOffsetLeft = 3;
    this.branchingOffsetRight = 0;
};
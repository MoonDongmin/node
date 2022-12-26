var candtMachine = {
    status:{
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candtMachine.getCandy;
var count = candtMachine.status.count;
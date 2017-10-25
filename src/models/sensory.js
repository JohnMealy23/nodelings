const Sensory = function(environment) {
    const sensory = {};
    const nodelingKeys = Object.keys(environment);
    sensory.inputNodelings = nodelingKeys.filter((key) => {
       const nodeling = environment[key];
       if(nodeling.neighborhood.children === 0) {
           return true;
       }
       return false;
    });
    return sensory;
};

export default Sensory;
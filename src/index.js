import Nodeling from './models/nodeling';
import Sensory from './models/sensory';

const environment = {};

const coords = [0, 0, 0];
const hippocampus = {}
const config = {
    limit: 3,
    parent: hippocampus,
    coords
};

const buildNeocortex = Nodeling(config, environment);

buildNeocortex
    .then((topNodeling) => {
        const sensory = Sensory(environment);
        console.log('Done!', {
            environment,
            sensory,
            topNodeling
        });
    });

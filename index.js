import Nodeling from './src/models/nodeling';
import Sensory from './src/models/sensory';

const environment = {};

const coords = [0, 0, 0];
const hypothalimus = {
    neighborhood: {
        checkin: () => { console.log("Done!") }
    }
}
const config = {
    limit: 10,
    parent: hypothalimus,
    coords
};

const firstNode = Nodeling(config, environment);

const sensory = Sensory(environment);

console.log({
    environment,
    sensory,
    firstNode
});
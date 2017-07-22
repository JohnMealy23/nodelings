import Nodeling from './src/models/nodeling';

const window = window || {};
window.environment = {};

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

const firstNode = Nodeling(config, window.environment);

console.log(window.environment);
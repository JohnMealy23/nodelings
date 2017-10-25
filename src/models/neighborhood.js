import utils from './utils';
import Nodeling from './nodeling';

const GetNeighborhood = function(config, environment) {

    const neighborhood = {};

    neighborhood.parent = config.parent;
    neighborhood.childMap = {};
    neighborhood.neighbors = [];
    neighborhood.children = [];
    neighborhood.peers = [];

    const getNextCoords = (coord, config) => {
        const nextCoords = [];
        for (let i = -1; i < 2; i++) {
            const nextCoord = coord + i;
            if (nextCoord > -(config.limit) && nextCoord < config.limit) {
                nextCoords.push(nextCoord);
            }
        }
        return nextCoords;
    };

    const isValidCoords = (() => {
        const selfCoordsKey = config.coords.join('|');
        return (neighborCoords) => {
            if(neighborCoords.join('|') === selfCoordsKey) {
                return false;
            }
            return true;
        }
    })();

    const getNeighborCoords = (coords, config) => {
        const neighborCoords = coords.reduce((neighbors, coord) => {
            // Get the three coords surrounding coord:
            const nextCoords = getNextCoords(coord, config);
            // If this is the first level of coords, neighbors will be empty, so make the seed:
            if (neighbors.length === 0) {
                return nextCoords.map(coord => [coord]);
            }
            // Add next layer of coords to existing neighbor coords:
            return neighbors.reduce((newNeighbors, neighbor) => {
                const threeNew = nextCoords.map(coord => [...neighbor, coord]);
                return newNeighbors.concat(threeNew);
            }, []);
        }, []);
        const vettedCoords = neighborCoords.filter(isValidCoords);
        return vettedCoords;
    };
    const neighborCoords = getNeighborCoords(config.coords, config);

    neighborhood.promise = Promise.all(neighborCoords.map(coords => {
        return new Promise((resolve) => {
            const neighborKey = utils.makeNodelingKey(coords);
            const newConfig = {
                coords,
                parent: this,
                limit: config.limit
            };
            setTimeout(() => {
                let neighbor = environment[neighborKey];
                if(neighbor === undefined) {
                    // If the neighbor wasn't there, that means it's time to create it.
                    // And creating it makes it this nodeling's child.
                    Nodeling(newConfig, environment)
                        .then((neighbor) => {
                            neighborhood.childMap[neighbor.key] = neighbor;
                            neighborhood.children.push(neighbor);
                            neighborhood.neighbors.push(neighbor);
                            resolve(neighbor);
                        });
                } else {
                    // The nodeling already existed
                    neighborhood.neighbors.push(neighbor);
                    neighborhood.peers.push(neighbor);
                    resolve(neighbor);
                }
            },0);
        });
    }));

    return neighborhood;
};

export default GetNeighborhood;
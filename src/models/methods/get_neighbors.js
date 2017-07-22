import utils from '../utils';
import Nodeling from '../nodeling';

const GetNeighborhood = (coords, config, environment) => {

    const neighborhood = {};
    neighborhood.lineageComplete = false;

    neighborhood.checkin = () => {
        neighborhood.lineageComplete = neighborhood.children.reduce((allThere, child) => {
           if(allThere === false || child.neighborhood.lineageComplete === false) {
               return false;
           }
           return true;
        }, true);
        if(neighborhood.lineageComplete === true) {
            config.parent.neighborhood.checkin();
        }
    };

    neighborhood.childMap = {};
    neighborhood.children = [];
    neighborhood.peers = [];

    neighborhood.neighbors = (() => {
        const getNextCoords = (coord, config) => {
            const nextCoords = [];
            for (let i = -1; i < 2; i++) {
                const nextCoord = coord + i;
                if (nextCoord > -1 && nextCoord < config.limit) {
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
                // for(let i=0; i<neighborCoords.length; i++) {
                //     const coord = neighborCoords[i];
                //     if(
                //         coord > config.limit
                //         || coord < 0
                //     ) {
                //         return false;
                //     }
                // }
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
        const neighborCoords = getNeighborCoords(coords, config);

        return neighborCoords.map(coords => {
            const neighborKey = utils.makeNodelingKey(coords);
            const newConfig = {
                coords,
                parent: config.parent,
                limit: config.limit
            };
            let neighbor = environment[neighborKey];
            if(neighbor === undefined) {
                // If the neighbor wasn't there, that means it's time to create it.
                // And creating it makes it this nodeling's child.
                neighbor = Nodeling(newConfig, environment);
                neighborhood.childMap[neighbor.key] = neighbor;
                neighborhood.children.push(neighbor);
            } else {
                // The nodeling already existed
                neighborhood.peers.push(neighbor);
            }

            return neighbor;
        });
    })();

    if(neighborhood.children.length === 0) {
        // This node produced no children,
        // Check in right away.
        config.parent.neighborhood.checkin();
    }

    return neighborhood;
};

export default GetNeighborhood;
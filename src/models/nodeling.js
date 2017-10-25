import utils from './utils';
import GetNeighborhood from './neighborhood';
import CreateApi from './create_api';
import CreateBody from './create_body';
/**
 *
 * @param {Object} config
 * @param {array} config.coords instance's position in n-dimensional grid
 * @returns {{}}
 * @constructor
 */
function Nodeling(config, environment = []) {
    const nodeling = {};

    // Clone the coords to sever parity:
    nodeling.coords = config.coords.map(dim => dim);

    // Stringify the coords to add to the map:
    nodeling.key = utils.makeNodelingKey(nodeling.coords);

    /*
     * Add unformed nodeling to the map.
     *
     * Because of the way nodelings procreate, it's necessary to do this before the neighborhood is made.
     * Reason being, the GetNeighorhood step searches around for empty slots in the grid.  If we don't
     * populate those slots with something now, a nodeling will not have a presence on the grid, when its
     * child checks to see if it's slot is populated.  At this point, the child would attempt to create
     * a redundant nodeling
     */
    environment[nodeling.key] = nodeling;

    // Create the api with which other nodelings will communicate
    nodeling.api = CreateApi.call(nodeling);

    /*
     * Create children and catalog neighbors.
     *
     * I'd like to multithread this process, so that the lineages of nodes could form simultaneously
     * I'd like to do this so that one nodeling lineage doesn't need to fully form before the next begins to form.
     *
     * A way to fake this would be to nextTick (or return a promise) each nodeling's creation.  They'd still be taking
     * turns on the same thread, but at least the lineages would form at the same pace.
     *
     * This would require a way for each nodeling to be able to check a global registry, to ensure it wasn't creating a
     * nodeling at coordinates where another lineage had already created a nodeling.
     */
    nodeling.neighborhood = GetNeighborhood.call(nodeling, config, environment);

    // Create the GUI elements for the nodeling:
    nodeling.body = CreateBody.call(nodeling, config);


    console.log(`nodeling ${nodeling.key} has been created!`);

    // This step ensures that all of a nodeling's children have formed, before it passes itself back to its parent:
    return nodeling.neighborhood.promise.then(() => {
        return nodeling;
    })
};


export default Nodeling;
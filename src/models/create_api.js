const CreateApi = function() {

    const api = {};
    const registry = {};

    api.getId = () => {
        return this.key;
    };

    api.isLowestDecendant = () => {
        if(this.neighborhood.children.length === 0) {
            return true;
        } else {
            return false;
        }
    };

    api.transmit = (data, neighbor) => {
        if (data.id === undefined) {
            const matchedId = checkForMatch(data.value);
            // If this datum was already relayed, retrieve its ID before passing along:
            if (matchedId) {
                data.id = matchedId;
            }
            // Relay backwards that the datum already had an ID
            neighbor.api.update(data);
        } else if (registry[data.id] !== undefined) {
            // This datum is new to this nodeling, but has already been tagged with an ID be another
            // Register it
            registry[data.id] = data;
        } else {
            // This data has already hit this nodeling.
            // Log the input pattern

        }

        let id;
        if (data.id !== undefined) {
            id = utils.getUid();
        } else {
        }
        this.neighbors.forEach((neighbor) => {
            neighbor.transmit(data, this);
        })
    };

    const checkForMatch = (value) => {
        const ids = Object.keys(registry);
        for (let i = 0; i < ids.length; i++) {
            if (value === registry[ids[i]]) {
                return ids[i];
            }
        }
    };

    api.update = (pair) => {
        pair.remove;
    };

    return api;
};

export default CreateApi;
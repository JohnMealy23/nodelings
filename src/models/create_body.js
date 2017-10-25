import utils from './utils';

const $container = document.createElement('div');
$container.style.position = 'relative';
$container.style.margin = '100px 0 0 100px';
document.body.appendChild($container);
const defaultColor = utils.randomColor();

const CreateBody = function(config) {
    const body = {};
    body.color = '';

    body.updateSelfColor = (color) => {
        body.$elem.style.background = color;
        if(body.color === color) {
            return false;
        } else {
            body.color = color;
            return true;
        }
    }
    body.updateParentColor = (color) => {
        const goOn = body.updateSelfColor(color);
        if(goOn === false) {
            return
        }
        if(this.neighborhood.parent.body) {
            setTimeout(() => {
                this.neighborhood.parent.body.updateParentColor(color);
            }, 200);
        }
    };
    body.updateChildrenColor = (color) => {
        const goOn = body.updateSelfColor(color);
        if(goOn === false) {
            return
        }
        this.neighborhood.children.forEach(neighbor => {
            setTimeout(() => {
                neighbor.body.updateChildrenColor(color);
            }, 200);
        });
    };

    body.updateNeighborColor = (color) => {
        const goOn = body.updateSelfColor(color);
        if(goOn === false) {
            return
        }
        this.neighborhood.neighbors.forEach(neighbor => {
            setTimeout(() => {
                neighbor.body.updateNeighborColor(color);
            }, 200);
        });
    };

    const makeTriggerElem = (size, text, func) => {
        const $elem = document.createElement('div');
        $elem.innerText = text;
        $elem.style.width = `${size}px`;
        $elem.style.height = `${size}px`;
        $elem.style.float = `left`;
        $elem.style.border = `solid 1px grey`;
        $elem.addEventListener('click', func);
        return $elem;
    };

    body.$elem = (() => {
        const $elem = document.createElement('div');
        const childSize = 50;
        const coords = this.coords;
        const $parentRow = getRow(coords);
        // $elem.style.padding = `${childSize}px`;
        // $elem.style.margin = `${unitMargin}px`;
        $elem.style.float = 'left';
        $elem.style.background = defaultColor;
        $elem.style.border = 'solid 1px blue';
        $elem.style.margin = '5px';
        $elem.style.opacity = 0.5;

        const $parentTrigger = makeTriggerElem(childSize, 'p', () => {
            const color = utils.randomColor();
            body.updateParentColor(color);
        });

        const $childrenTrigger = makeTriggerElem(childSize, 'c', () => {
            const color = utils.randomColor();
            body.updateChildrenColor(color);
        });

        const $neighborTrigger = makeTriggerElem(childSize, 'n', () => {
            const color = utils.randomColor();
            body.updateNeighborColor(color);
        });

        const childElems = [
            $parentTrigger,
            $childrenTrigger,
            $neighborTrigger
        ];

        childElems.forEach(($child) => {
            $elem.appendChild($child);
        });

        $parentRow.appendChild($elem);
        return $elem;
    })();

    return body;
};

const getRow = (() => {
    const registry = [];
    return ([x, y, z]) => {
        const id = `${z}|${x}`;
        let $row = registry[id];
        if ($row === undefined) {
            $row = document.createElement('div');
            $row.id = `row-${id}`;
            registry[id] = $row;
            const $layer = getLayer(z);
            $layer.appendChild($row);
        }
        return $row;
    }
})();
const getLayer = (() => {
    const registry = [];
    return (z) => {
        let $layer = registry[z];
        if ($layer === undefined) {
            $layer = document.createElement('div');
            $layer.id = `layer-${z}`;
            $layer.style.zIndex = -(z);
            $layer.style.position = 'absolute';
            $layer.style.left = `${z * 50}px`;
            $layer.style.top = `${z * 50}px`;
            registry[z] = $layer;
            $container.appendChild($layer);
        }
        return $layer;
    }
})();

export default CreateBody;
import utils from './utils';

const CreateBody = function() {
    const body = {};
    body.color = '';

    body.updateNeighborColor = (color) => {
        if(body.color === color) {
            return;
        } else {
            body.color = color;
        }
        body.$elem.style.background = color;
            this.neighborhood.children.forEach(neighbor => {
                setTimeout(() => {
                    neighbor.body.updateNeighborColor(color);
                }, 200);
            });
    };

    body.$elem = (() => {
        const $elem = document.createElement('div');
        const unitSize = 100;
        const coords = this.coords;
        $elem.style.height = `${unitSize}px`;
        $elem.style.width = `${unitSize}px`;
        $elem.style.zIndex = coords[coords.length - 1];
        $elem.style.position = 'absolute';
        $elem.style.left = `${coords[1] * unitSize + (coords[0] * 20)}px`;
        $elem.style.top = `${coords[2] * unitSize + (coords[0] * 20)}px`;
        $elem.style.background = 'red';
        $elem.style.border = 'solid 1px blue';
        $elem.style.margin = '3px';
        $elem.style.opacity = 0.5;
        $elem.addEventListener('click', () => {
            const color = utils.randomColor();
            body.updateNeighborColor(color);
        });
        document.body.appendChild($elem);
        return $elem;
    })();

    return body;
};

export default CreateBody;
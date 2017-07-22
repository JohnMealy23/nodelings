import C from '../constants.js';
import randomColor from 'randomcolor';

const utils = {
    makeNodelingKey: (coords) => {
        return coords.join(C.DELINIATOR);
    },
    getUid: (() => {
        let count = 0;
        return () => count++;
    })(),
    randomColor
};

export default utils;
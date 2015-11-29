import { FLIP_CARD, RESTART_GAME } from '../constants/memory';

export default {

    flipCard : (id) => ({
        type : FLIP_CARD,
        id
    }),

    restart : () => ({
        type : RESTART_GAME
    })

}

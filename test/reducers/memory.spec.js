import expect from 'expect'
import memory from '../../reducers/memory'
import * as types from '../../constants/memory'

const initialState = {
    round : 1,
    guess1 : null,
    guess2 : null,
    cards : [
        { id : 0, rel : 1, flipped : false, url : `http://url.example/first`, discovered : false},
        { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
        { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
        { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
    ]
}

describe('memory reducer', () => {
    it('should handle initial state', () => {
        expect(
            memory(initialState, {})
        ).toEqual(
            initialState
        )
    })

    it('should handle FLIP_CARD on first round', () => {
        expect(
            memory(initialState, {
                type: types.FLIP_CARD,
                id : 0
            })
        ).toEqual({
            round : 2,
            guess1 : 0,
            guess2 : null,
            cards : [
                { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : false},
                { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
                { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
            ]
        })
    })

    it('should handle FLIP_CARD on second round without match', () => {
        expect(
            memory({
                round : 2,
                guess1 : 0,
                guess2 : null,
                cards : [
                    { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : false},
                    { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
                    { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                    { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
                ]
            }, {
                type: types.FLIP_CARD,
                id : 2
            })
        ).toEqual({
            round : 3,
            guess1 : 0,
            guess2 : 3,
            cards : [
                { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : false},
                { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
                { id : 2, rel : 3, flipped : true, url : `http://url.example/second`, discovered : false},
                { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
            ]
        })
    })

    it('should handle FLIP_CARD on second round with match', () => {
        expect(
            memory({
                round : 2,
                guess1 : 0,
                guess2 : null,
                cards : [
                    { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : false},
                    { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
                    { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                    { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
                ]
            }, {
                type: types.FLIP_CARD,
                id : 1
            })
        ).toEqual({
            round : 3,
            guess1 : 0,
            guess2 : 0,
            cards : [
                { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : true},
                { id : 1, rel : 0, flipped : true, url : `http://url.example/first`, discovered : true},
                { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
            ]
        })
    })

    it('should handle FLIP_CARD on third round without previous match', () => {
        expect(
            memory({
                round : 3,
                guess1 : 0,
                guess2 : 2,
                cards : [
                    { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : false},
                    { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : false},
                    { id : 2, rel : 3, flipped : true, url : `http://url.example/second`, discovered : false},
                    { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
                ]
            }, {
                type: types.FLIP_CARD,
                id : 1
            })
        ).toEqual({
            round : 4,
            guess1 : 1,
            guess2 : null,
            cards : [
                { id : 0, rel : 1, flipped : false, url : `http://url.example/first`, discovered : false},
                { id : 1, rel : 0, flipped : true, url : `http://url.example/first`, discovered : false},
                { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
            ]
        })
    })

    it('should handle FLIP_CARD on third round after previous match', () => {
        expect(
            memory({
                round : 3,
                guess1 : 0,
                guess2 : 1,
                cards : [
                    { id : 0, rel : 1, flipped : true, url : `http://url.example/first`, discovered : true},
                    { id : 1, rel : 0, flipped : true, url : `http://url.example/first`, discovered : true},
                    { id : 2, rel : 3, flipped : false, url : `http://url.example/second`, discovered : false},
                    { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
                ]
            }, {
                type: types.FLIP_CARD,
                id : 2
            })
        ).toEqual({
            round : 4,
            guess1 : 2,
            guess2 : null,
            cards : [
                { id : 0, rel : 1, flipped : false, url : `http://url.example/first`, discovered : true},
                { id : 1, rel : 0, flipped : false, url : `http://url.example/first`, discovered : true},
                { id : 2, rel : 3, flipped : true, url : `http://url.example/second`, discovered : false},
                { id : 3, rel : 2, flipped : false, url : `http://url.example/second`, discovered : false},
            ]
        })
    })
})

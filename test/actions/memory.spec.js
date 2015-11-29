import expect from 'expect'
import * as types from '../../constants/memory'
import * as actions from '../../actions/memory'

describe('memory actions', () => {
  it('flipCard should create FLIP_CARD action', () => {
    expect(actions.flipCard(1)).toEqual({
      type: types.FLIP_CARD,
      id: 1
    })
  })

  it('restart should create RESTART_GAME action', () => {
    expect(actions.restart()).toEqual({
      type: types.RESTART_GAME
    })
  })
})

import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CardList from '../../components/CardList'
import CardListItem from '../../components/CardListItem'

function setup(propOverrides) {
    const props = Object.assign({
        cards : [
            {
                id : 0,
                rel : 1,
                flipped : false,
                url : `http://example.url/first`,
                discovered : false
            }, {
                id : 1,
                rel : 0,
                flipped : false,
                url : `http://example.url/first`,
                discovered : false
            }
        ],
        flipCard : expect.createSpy()
    }, propOverrides)

    const renderer = TestUtils.createRenderer()
    renderer.render(<CardList {...props} />)
    const output = renderer.getRenderOutput()

    return {
        props: props,
        output: output,
        renderer: renderer
    }
}


describe('components', () => {
    describe('CardList', () => {

        it('should render', () => {
            const { output, props } = setup()

            expect(output.type).toBe('ul')
            expect(output.props.className).toBe('cards')

            expect(output.props.children.length).toBe(2)
            output.props.children.forEach((item, i) => {
                expect(item.type).toBe(CardListItem)
                expect(item.props.card).toBe(props.cards[i])
            })
        })

        it('should flip clicked card', () => {
            const { output, renderer, props } = setup()
            const list = output.props.children

            list[0].props.flipCard(list[0].props.id)

            const updated = renderer.getRenderOutput()
            expect(updated.props.children.length).toBe(2)
            expect(updated.props.children[0].props.card).toBe(props.cards[0])
        })

    })
})

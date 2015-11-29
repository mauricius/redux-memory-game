import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CardListItem from '../../components/CardListItem'

function setup() {
    const props = {
        card : {
            id : 0,
            rel : 1,
            flipped : false,
            url : `http://example.url/first`,
            discovered : false
        },
        flipCard : expect.createSpy()
    }

    const renderer = TestUtils.createRenderer()

    renderer.render(<CardListItem {...props} />)

    let output = renderer.getRenderOutput()

    return {
        props: props,
        output: output,
        renderer: renderer
    }
}

describe('components', () => {
    describe('CardListItem', () => {

        it('initial render', () => {
            const { output } = setup()

            expect(output.type).toBe('li')
            expect(output.props.className).toBe('flip-container')

            const div = output.props.children

            expect(div.type).toBe('div')
            expect(div.props.className).toBe('flipper')

            const [ front, back ] = div.props.children

            expect(front.type).toBe('div')
            expect(front.props.className).toBe('front')

            expect(back.type).toBe('div')
            expect(back.props.className).toBe('back')
        })

        it('front onClick should call flipCard', () => {
            const { output, props } = setup()

            const div = output.props.children
            const front = div.props.children[0]
            front.props.onClick({})
            expect(props.flipCard).toHaveBeenCalledWith(0)
        })

  })
})

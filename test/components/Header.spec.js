import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Header from '../../components/Header'

function setup(propOverrides) {
    const props = Object.assign({}, {
        round : 0,
        restart : expect.createSpy()
    }, propOverrides);

    const renderer = TestUtils.createRenderer()

    renderer.render(<Header {...props} />)

    let output = renderer.getRenderOutput()

    return {
        props: props,
        output: output,
        renderer: renderer
    }
}

describe('components', () => {
    describe('Header', () => {

        it('initial render', () => {
            const { output } = setup()

            expect(output.type).toBe('div')

            const [h2, button] = output.props.children

            expect(h2.type).toBe('h2')

            const [round, val] = h2.props.children

            expect(round).toBe('Round: ')
            expect(val).toBe(0)

            expect(button.type).toBe('button')
            expect(button.props.className).toBe('button button--warning text-center')
        })

        it('restart button should be disabled on round 0', () => {
            const { output } = setup()

            const [ , button] = output.props.children

            expect(button.props.disabled).toBe(true)
        })

        it('restart button onClick should call restart on round 1', () => {
            const { output, props } = setup({ round : 1})

            const [ , button] = output.props.children

            button.props.onClick({})
            expect(props.restart).toHaveBeenCalled()
        })

  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonAtom from '../atoms/ButtonAtom.vue'

describe('Buttom Atom', () => {
  it('renders properly', () => {
    const wrapper = mount(ButtonAtom)
    expect(wrapper.find('#btn-atom').exists()).toBe(true)
  })

  it('Renders the label', () => {
    const wrapper = mount(ButtonAtom, { props: { label: 'Hello World', disabled: false } })
    expect(wrapper.find('#btn-atom').text()).toContain('Hello World')
  })
})

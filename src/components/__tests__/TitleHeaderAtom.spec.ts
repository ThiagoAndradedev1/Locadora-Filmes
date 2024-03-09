import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TitleHeaderAtom from '../atoms/TitleHeaderAtom.vue'

describe('Title Header Atom', () => {
  it('renders properly', () => {
    const wrapper = mount(TitleHeaderAtom)
    expect(wrapper.find('#title-header').exists()).toBe(true)
  })

  it('Renders the titl props', () => {
    const wrapper = mount(TitleHeaderAtom, { props: { title: 'testing!' } })
    expect(wrapper.find('#title-header').text()).toContain('testing!')
  })
})

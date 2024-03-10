import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BadgeAtom from '../atoms/BadgeAtom.vue'

describe('Badge Atom', () => {
  test('renders correctly with success severity', async () => {
    const wrapper = mount(BadgeAtom, {
      props: {
        label: 'Test',
        severity: 'success'
      }
    })

    expect(wrapper.text()).toBe('Test')
    expect(wrapper.classes()).toContain('bg-green-500')
  })

  test('renders correctly with error severity', async () => {
    const wrapper = mount(BadgeAtom, {
      props: {
        label: 'Test',
        severity: 'error'
      }
    })

    expect(wrapper.text()).toBe('Test')
    expect(wrapper.classes()).toContain('bg-red-500')
  })

  test('renders correctly with primary severity', async () => {
    const wrapper = mount(BadgeAtom, {
      props: {
        label: 'Test',
        severity: 'primary'
      }
    })

    expect(wrapper.text()).toBe('Test')
    expect(wrapper.classes()).toContain('bg-blue-500')
  })
})

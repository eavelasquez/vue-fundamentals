import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  test('should match snapshot', () => {
    const wrapper = shallowMount(Counter)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('h2 should be the default value', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2 = wrapper.find('h2')

    expect(h2.text()).toBe('Current Counter')
  })

  test('the default initial counter should be 7 on p', () => {
    const p = wrapper.find('[data-testid="counter"]')

    expect(p.text()).toBe('0')
  })

  test('should decrement counter when button is clicked', () => {
    const button = wrapper.find('button')

    button.trigger('click')

    expect(wrapper.vm.counter).toBe(-1);
  })

  test('should increment counter when button is clicked', () => {
    const button = wrapper.findAll('button')[1]

    button.trigger('click')
    button.trigger('click')

    expect(wrapper.vm.counter).toBe(2);
  })

  test('should reset counter when button is clicked', async () => {
    const button = wrapper.findAll('button')[2]

    await button.trigger('click')
    const p = wrapper.find('[data-testid="counter"]')

    expect(p.text()).toBe('0')
  })

  test('should set the default initial counter', () => {
    const { initialCounter } = wrapper.props()

    const p = wrapper.find('[data-testid="counter"]')

    expect(+(p.text())).toBe(initialCounter)
  })

  test('should show the prop title', () => {
    const title = 'Incoming'
    const wrapper = shallowMount(Counter, { props: { title } })
    const h2 = wrapper.find('h2')

    expect(h2.text()).toBe(title)
  })
})
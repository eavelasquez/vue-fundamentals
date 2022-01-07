import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision.vue', () => {
  let wrapper
  let clgSpy

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif'
    })
  }))

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    clgSpy = jest.spyOn(console, 'log')
    jest.clearAllMocks()
  })


  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should not execute the method getAnswer (console.log)', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
    const input = wrapper.find('input')

    await input.setValue('Do you like to dance')

    expect(clgSpy).toHaveBeenCalled()
    expect(clgSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerSpy).not.toHaveBeenCalled()
  })

  test('should execute the method getAnswer when it ends question mark (?)', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
    const input = wrapper.find('input')

    await input.setValue('Do you like to dance?')

    expect(getAnswerSpy).toHaveBeenCalledTimes(1)
  })

  test('should work method getAnswer', async () => {
    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect(img.exists()).toBeTruthy()
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect(wrapper.vm.answer).toBe('Yes')
  })

  test('should work method getAnswer - failed request', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'))
    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect(img.exists()).toBeFalsy()
    expect(wrapper.vm.image).toBe('')
    expect(wrapper.vm.answer).toBe('Error: API request failed')
  })
})
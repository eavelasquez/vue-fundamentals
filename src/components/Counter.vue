<template>
  <h2>{{ customTitle }}</h2>
  <p data-testid="counter">{{ counter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squaredCounter }}</p>
  <!-- <p>{{ counter }} <sup>2</sup> = {{ calculateSquaredCounter() }}</p> -->

  <div class="buttons-container">
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <button @click="reset">&#8634;</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    title: String,
    initialCounter: {
      type: Number,
      default: 0,
      // required: true,
      // Custom validator function
      validator(value) {
        return value >= 0
      },
    },
  },
  data() {
    return {
      counter: this.initialCounter,
    }
  },
  methods: {
    // calculateSquaredCounter() {
    //   console.log('methods: calculateSquaredCounter()')
    //   return this.counter * this.counter
    // },
    decrement() {
      this.counter -= 1
    },
    increment() {
      this.counter += 1
    },
    reset() {
      this.counter = this.initialCounter
    },
  },
  computed: {
    // a computed getter
    squaredCounter() {
      console.log('computed: squaredCounter')
      // `this` points to the vm instance
      return this.counter * this.counter
    },
    customTitle() {
      return this.title || 'Current Counter'
    },
  },
}
</script>

<style scoped>
p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}
</style>
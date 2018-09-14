<template>
<div class="index">
  <TestComponent />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TestComponent from '@c/TestComponent.vue'

export default {
  components: { TestComponent },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      test: 'test'
    })
  },
  methods: {
    ...mapActions([
      'setTest'
    ])
  },
  mounted () {
    this.setTest(5)
  }
}
</script>

<style lang="sass">
@import 'common';

.index {
}
</style>

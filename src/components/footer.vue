<template>
  <div class="footer">
      <!-- <p>count: {{count}}</p>
      <p>name: {{name}}</p>
      <button @click="setCount(count+1)">+</button>
      <button @click="setCount(count-1)">-</button>
      <button @click="changeName(name2)">change</button>
      <input type="text" ref="input1"> -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            name2: '张三'
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: 100px;
    background-color: #0E396F;
    color: #fff;
}
</style>
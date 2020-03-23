<template>
  <div id="apps" @mousedown="move">
    <!--绑定按下事件-->
    {{positionX}}
    {{positionY}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      positionX: 0,
      positionY: 0
    };
  },
  methods: {
    move(e) {
      let odiv = e.target; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>
<style scoped>
#apps {
  position: relative; /*定位*/
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  background: #666; /*设置一下背景*/
}
</style>

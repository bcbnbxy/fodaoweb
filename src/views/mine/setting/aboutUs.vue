<template>
  <div class='page'>
    <div class="aboutUsBox">
      <h4>“将性智慧普及到全世界每一个角落，让每一个人都能够拥有正确的性智慧！”</h4>
      <p>以传播正确的性智慧，性观念，性知识，性文化，性功夫为核心观念，致力于传播中国五千年传统文化，发往中国古代先人流传下来的智慧。<br>
        励志打开用正确的性智慧打开全球人类性智慧的开关，让全球每一个人都能够真正的接受正确的性知识培训，不让每一个家庭因为对性的无知而走上灭亡，不让每一个青少年对性的无知而伤害身体！让全世界每一个人都不受性的困扰，真正的走向文明，持续向前发展！</p>
      <p>公司副总裁的连彪，看到中国目前教育市场的黑暗，把教育做成了纯商业化，收取大量资金却不能够实质意义的帮助每一位同学，将每一个系列的课程拿出来换取金钱，内心深受触动，下定决心希望改变目前教育现状，发誓要真正的以实质意义的去帮助每一位同学，让全天下每一个同学都能够花最少的钱学习到最正确的学问！</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      document.title = '关于我们'
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @wu:100vw / 375;
  .aboutUsBox {
    width: 335*@wu;
    margin: 30*@wu auto 0 auto;
    font-size: 13*@wu;
    color: #001313;
    line-height: 30*@wu;
    h4{
      opacity: 0.9;
      font-size: 14*@wu;
      color: #262525;
      line-height: 20*@wu;
      margin-bottom: 25*@wu;
    }
    p{
      text-indent: 2em;
    }
    p:last-child{
      margin-top: 30*@wu;
    }
  }
</style>

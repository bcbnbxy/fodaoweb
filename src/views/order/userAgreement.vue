<template>
  <div class='page'>
    <div class="userAgreementBox">
      <h4>本服务条款是用户(您)与福道文化传播有限公司之间的协议.福道文化传播app由福道文化传播有限公司所运行的各个app和网页构成.</h4>
      <p>
        重要须知:福道文化传播有限公司在此提醒,用户 ( 您 )
        欲访问和使用app,必须事先认真阅读本服务条款中的用户的权利限制.包括免费或者限制福道文化传播有限公司的责任的免责条款 ( 未成年人审阅时应该得到法人监护人的陪同).如您不同意本服务条款/或随时对其的修改,您应不不使用或主动取消福道文化公司提供的服务.如您选“同意”您的使用行为将被视为您对本服务条款全部的完全接受.
      </p>
      <p>我们提供服务时,可能会收集,储存和使用下列与您有关的信息.如果您不提供相关信息,可能无法注册成为我们的终身合伙人或无法享受我们提供的某些服务,或者无法达到相关服务拟达到的效果 . 在我们提供服务时,用于身份验证,客服服务,安全服务,安全防范,诈骗监测,存档和备份用途,确保我们向您提供的产品和服务的安全性.</p>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @wu: 100vw / 375;
  .userAgreementBox{
    padding: 30*@wu 20*@wu;
    h4{
      font-size: 14*@wu;
      color: rgb(62,62,62);
      margin-top: 0;
    }
    p{
      text-indent: 2em;
      font-size: 13*@wu;
      color: #001313;
      line-height: 30*@wu;
    }
  }
</style>

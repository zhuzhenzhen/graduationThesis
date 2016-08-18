<template>
  <div class="resouceList">
    <div class="col-xs-12 col-md-4 col-lg-4">
      <div class="primary">
        <a v-link="{name: 'test', replace: false}">
          <img src="http://images.bookuu.com/book/C/01409/97875463905742293763-fm.jpg" alt="数学闯关">
          <span>开启数学闯关之旅～</span>
        </a>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-lg-4">
      <div class="mid">
        <a v-link="{name: 'vedio', replace: false}">
          <img src="http://img5.imgtn.bdimg.com/it/u=4041031354,1989881045&fm=21&gp=0.jpg" alt="数学视频">
          <span>进入数学视频教学～</span>
        </a>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-lg-4">
      <div class="high">
        <a v-link="{name: 'game', replace: false}">
          <img src="http://img4.imgtn.bdimg.com/it/u=4010099251,3853722367&fm=21&gp=0.jpg" alt="数学游戏">
          <span>走进数学游戏天地～</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
  .resouceList .col-xs-12 {
    height: 200px;
    padding: 2rem;
    padding-left: 6%;
  }
  .primary, .mid, .high {
    border: 2px solid #ccc;
    border-radius: 5px;
    width: 200px;
    height: 170px;
    overflow: hidden;
  }
  .primary img, .mid img, .high img {
    width: 100%;
    height: 100%;
  }
  .resouceList .primary img:hover,
  .resouceList .mid img:hover,
  .resouceList .high img:hover
  {
    transform:scale(2);
    -webkit-transform:scale(2);
    transition-duration: 9s;
    -webkit-transition-duration: 9s;
  }
  .resouceList a span {
    font-size: 15px;
    color: #000;
    margin-top: 70px;
    margin-left: 29px;
    position: absolute;
    bottom: -25px;
  }
</style>
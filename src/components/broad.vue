<template>
  <div class="broad">
    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="span4">
        <div id="myCarousel" class="carousel slide">
        <!-- Carousel items -->
          <div class="carousel-inner">
            <div class="active item"><img src="/static/assets/math_pic2.jpg" /></div>
            <div class="item"><img src="/static/assets/math_pic1.jpg" /></div>
            <div class="item"><img src="/static/assets/math_pic3.jpg"/></div>
          </div>
          <!-- Carousel nav -->
          <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
          <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


</script>
<style>
  .broad {
    width: 100%;
    height: 400px;
  }
  .broad .row {
    margin-top: 6rem;
  }
  .broad .item {
    width: 100rem;
    height: 320px;
  }
  .broad .carousel-control {
    padding-top: 5rem;
    font-size: 10rem;
  }
</style>
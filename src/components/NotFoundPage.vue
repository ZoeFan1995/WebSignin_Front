<template>
  <div class="error_wrap">
    <div class="error_text">
      <h1>404 ERROR</h1>
      <h2>唉呀~你好像跑到奇怪的地方去啦</h2>
      <router-link to="/">
        <button to="/">點我帶你回首頁</button>
      </router-link>
    </div>
    <div class="error_img">
      <img src="@/assets/icon/broken-clock.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss">
.error_wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a2d3d4;
  > .error_text {
    > h1 {
      font-size: 60px;
    }
    > a {
      > button {
        margin-top: 20px;
        padding: 8px 20px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        background-color: #88929f;
        color: white;
        border-radius: 1.5rem;
        box-shadow: 0px 2px 6px #105355;
        cursor: pointer;
        &:hover {
          background-color: #da9b28;
        }
        &:active {
          background-color: #da9b28;
        }
      }
    }
  }
}

@media screen and (max-width: 420px) {
  .error_wrap {
    width: auto;
    height: 100%;
    flex-direction: column-reverse;
    > .error_img {
      > img {
        width: 300px;
      }
    }
    > .error_text {
      margin-top: 20px;
      > h1 {
        font-size: 40px;
      }
      > h2 {
        font-size: 20px;
      }
    }
  }
}
</style>

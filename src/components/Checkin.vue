<template>
  <div class="checkin_bg">
    <div class="top_bar">
      <h5>{{ EmployeeName }} 您登入時間為{{ LoginDay }} {{ LoginTime }}</h5>
      <h5 class="timer">連線剩餘時間 {{ timer }}</h5>
      <span id="logout" @click="signout()"
        ><img src="@/assets/icon/logout.png" alt="" />登出</span
      >
    </div>
    <div class="stamp">
      <div class="stamp_text">
        <h5 id="punchMes"></h5>
      </div>
    </div>

    <div class="function_wrap">
      <div class="function_box">
        <img src="@/assets/icon/signin.png" alt="signin" />
        <button class="function_btn" @click="punch('上班')">上班簽到</button>
      </div>
      <div class="function_box">
        <img src="@/assets/icon/signout.png" alt="signout" />
        <button class="function_btn" @click="punch('下班')">下班簽退</button>
      </div>
      <div class="function_box">
        <img src="@/assets/icon/goout.png" alt="goout" />
        <button class="function_btn" @click="punch('外出')">外出簽退</button>
      </div>
      <div class="function_box">
        <img src="@/assets/icon/return.png" alt="return" />
        <button class="function_btn" @click="punch('外歸')">外歸簽到</button>
      </div>
    </div>
  </div>
</template>

<script>
import { signApi } from "@/api.js";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  setup() {
    const timer = ref("60");
    const router = useRouter();
    const EmployeeName = ref("");
    const LoginDay = ref("");
    const LoginTime = ref("");
    const EmployeeID = ref("");
    const Token = ref("");
    onMounted(() => {
      //登入開始倒數
      setInterval(() => {
        countdown();
      }, 1000);
      const userData = localStorage.getItem("userData");
      getUserData(userData);
    });

    //取得使用者資訊
    const getUserData = (userData) => {
      const data = JSON.parse(userData);
      EmployeeID.value = data["EmployeeID"];
      LoginDay.value = data["LoginDay"];
      LoginTime.value = data["LoginTime"];
      EmployeeName.value = data["EmployeeName"];
      Token.value = `Bearer ${data["Token"]}`;
    };

    //打卡
    const punch = (staus) => {
      const signData = {
        EmployeeID: EmployeeID.value,
        EmployeeName: EmployeeName.value,
        LoginDay: LoginDay.value,
        LoginTime: LoginTime.value,
        SignStatus: staus,
      };

      signApi(signData, Token.value)
        .then((res) => {
          document.getElementById(
            "punchMes"
          ).innerText = `${staus} 打卡時間為${res.data.data.SignDay} ${res.data.data.SignTime} `;

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response);
          document.getElementById("punchMes").innerText =
            error.response.data.data;
        });
    };

    //登出
    const signout = () => {
      localStorage.clear();
      router.replace({ path: "/" });
    };

    //時間到登出
    const countdown = () => {
      timer.value--;
      if (timer.value === 0) {
        signout();
      }
    };
    return {
      signout,
      punch,
      timer,
      EmployeeName,
      LoginDay,
      LoginTime,
    };
  },
};
</script>

<style scoped lang="scss">
.checkin_bg {
  width: 100vw;
  height: 100vh;
  display: block;
  background-color: rgba(52, 160, 164, 0.702);
}
.top_bar {
  width: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  position: relative;
  > h5 {
    width: 100%;
    font-size: 18px;
    color: #f8f9fa;
    letter-spacing: 0.08rem;
    line-height: 48px;
  }
  > .timer {
    position: absolute;
    top: 20px;
    right: 200px;
    width: auto;
  }
  > #logout {
    position: absolute;
    top: 20px;
    right: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 1px 4px #e9b149;
    border-radius: 1.2rem;
    padding: 8px 12px;
    color: #f8f9fa;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      background-color: #e9b149;
    }
    &:active {
      background-color: #e9b149;
    }
    > img {
      width: 32px;
      margin-right: 8px;
    }
  }
}

.stamp {
  width: 100%;
  height: 80px;
  padding: 0px 50px;
  > .stamp_text {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > h5 {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: 0.08rem;
      color: #f8f9fa;
      border-bottom: 3px #e9b149 solid;
      padding-bottom: 2px;
    }
  }
}

.function_wrap {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 60px 0px;
  background-color: rgba(248, 249, 250, 0.6);
  border-radius: 0.8rem;
  > .function_box {
    border: 3px #34a0a4b3 solid;
    box-shadow: 0px 0px 10px 2px rgba(52, 160, 164, 0.6);
    margin: 40px 6px;
    padding: 30px 20px;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #f8f9fa;

    > img {
      width: 200px;
    }
    > .function_btn {
      border: none;
      margin-top: 20px;
      padding: 8px 30px;
      border-radius: 1.2rem;
      font-size: 18px;
      font-weight: 700;
      color: #f8f9fa;
      background-color: #34a0a4b3;
      cursor: pointer;
      &:hover {
        background-color: #e9b149;
      }
      &:active {
        background-color: #e9b149;
      }
    }
  }
}

@media screen and (max-width: 430px) {
  .checkin_bg {
    width: auto;
    height: auto;
    padding-bottom: 20px;
  }
  .top_bar {
    padding: 0px 20px;
    > h5 {
      margin-top: 80px;
      font-size: 16px;
    }
    > .timer {
      top: -60px;
      right: 140px;
    }
    > #logout {
      top: 20px;
      right: 20px;
    }
  }
  .function_wrap {
    flex-direction: column;
    padding: 20px 40px;
    margin: 20px 30px 0px;

    > .function_box {
      padding: 20px;
      margin: 20px 6px;
    }
  }

  .stamp {
    padding: 0px 20px;
    height: 60px;
    > .stamp_text {
      > h5 {
        font-size: 16px;
      }
    }
  }
}

@media (min-width: 765px) and (max-width: 1200px) {
  .function_wrap {
    flex-wrap: wrap;
  }
  .top_bar {
    > .timer {
      top: 60px;
      right: 40%;
    }
    > #logout {
      top: 20px;
      right: 16px;
    }
  }
}
</style>

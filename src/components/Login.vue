<template>
  <div class="login_bg">
    <div class="login_div">
      <div class="title">
        <img src="@/assets/icon/fingerprint.png" alt="fingerprint" />
        <h1>線上打卡系統</h1>
      </div>
      <div class="form">
        <form>
          <input
            type="text"
            placeholder="員工編號"
            autocomplete="off"
            v-model="um"
          />
          <input
            type="password"
            placeholder="開機密碼"
            autocomplete="off"
            v-model="up"
          />
          <h5 id="errorMes"></h5>
          <button @click.prevent="login()">登入系統</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from "@/api.js";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const um = ref("");
    const up = ref("");

    //登入
    const login = () => {
      const data = {
        EmployeeID: um.value,
        Password: up.value,
      };

      loginApi(data)
        .then((res) => {
          const data = res.data.data;
          data["EmployeeID"] = um.value;
          localStorage.setItem("userData", JSON.stringify(data));
          router.push({ path: "/checkin" });
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 401) {
            document.getElementById("errorMes").innerText = "";
            document.getElementById("errorMes").innerText =
              error.response.data.data;
          }
        });
    };
    return { login, um, up };
  },
};
</script>

<style lang="scss">
.login_bg {
  background-color: rgba(52, 160, 164, 0.702);

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_div {
  background-color: #f8f9fa;
  color: #4298d1;
  padding: 50px 30px;
  border-radius: 0.6rem;
  box-shadow: 0px 0px 16px #666;
  > .title {
    > img {
      width: 100px;
    }
    > h1 {
      font-size: 28px;
    }
  }
  > .form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    width: 260px;
    padding: 0px 20px;
    > form {
      > input {
        font-size: 16px;
        width: 100%;
        text-align: center;
        outline: none;
        border: none;
        padding: 8px 0px;
        margin-bottom: 8px;
        border-bottom: 1px rgb(201, 199, 199) solid;
        color: #496683;
        background-color: #f8f9fa;
        &::placeholder {
          color: rgb(175, 172, 172);
        }
        &:focus {
          border-bottom: 1px #ffc353 solid;
          caret-color: #ffc353;
        }
      }
      > button {
        border: none;
        margin-top: 10px;
        padding: 10px 30px;
        font-size: 16px;
        background-color: #e1e3e6;
        color: rgb(52, 160, 164);
        border-radius: 1.2rem;
        font-weight: 800;

        &:hover {
          cursor: pointer;
          background-color: #e9b149;
          color: #e1e3e6;
        }
      }
      //錯誤訊息
      #errorMes {
        color: #be0927;
        font-size: 16px;
      }
    }
  }
}
</style>

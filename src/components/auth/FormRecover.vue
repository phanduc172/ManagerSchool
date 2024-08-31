<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <b-card id="cardLogin" class="scale-in-bl w-50">
      <b-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        v-if="show"
        id="formLogin"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          class="blob"
        >
          <path
            fill="#41B883"
            d="M66.2,-49.1C81.5,-33.5,86.8,-6.2,79.8,15.6C72.7,37.5,53.3,53.9,30.9,65.1C8.5,76.2,-16.9,81.9,-36.2,73.3C-55.5,64.7,-68.8,41.7,-70.8,19.9C-72.8,-2,-63.6,-22.7,-49.9,-37.8C-36.2,-53,-18.1,-62.7,3.6,-65.6C25.4,-68.5,50.8,-64.6,66.2,-49.1Z"
            transform="translate(100 100)"
          />
        </svg>

        <h1 class="text-center mb-3">Quên mật khẩu</h1>
        <h2 class="text-center mb-4">Nhập email tài khoản của bạn</h2>

        <b-form-group id="input-group-1" label-for="email">
          <b-form-input
            id="email"
            class="input"
            v-model="form.email"
            type="email"
            placeholder="E-mail"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.email">
            * {{ errors.email }}
          </div>
        </b-form-group>

        <div class="d-flex justify-content-center mt-3">
          <button type="submit" class="px-3 py-2 border-0 rounded bg-success">
            <h5 class="text-white m-0 p-1">Tiếp tục</h5>
          </button>
        </div>

        <div class="d-flex justify-content-center flex-wrap mt-4 register">
          <a @click="$router.go(-1)" class="loginAccount text-hover"
            >Quay lại trang đăng nhập</a
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
import { validateLoginForm } from "../../common/utils/validate";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        checked: [],
      },
      errors: {
        email: "",
        checked: [],
      },
      show: true,
    };
  },
  methods: {
    ...mapActions("auth", ["handleRecoverPassword"]),
    async onSubmit() {
      this.errors = validateLoginForm(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      alert("Submit");
      await this.handleRecoverPassword({
        email: email,
      });
      console.log("aaaa");
    },
    onReset() {
      this.form.email = "";
      this.form.checked = [];
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
  
<style lang="scss">
@import "../../assets/scss/animations.scss";
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/font.scss";

body {
  font-family: $OpenSans !important;
}

#page-content-wrapper {
  margin: 0;
  background: url(/src/assets/images/bg.jpg) no-repeat center center;
  background-size: cover;
}

#cardLogin {
  border-radius: 15px;
  box-shadow: 0px 0px 10px $gray;

  #formLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    position: relative;

    h1 {
      color: $primary;
      font-weight: 700;
      font-family: $Poppins;
    }

    h2 {
      font-size: 1.2rem;
      color: $lightBlack;
      font-weight: 600;
      font-family: $Poppins;
    }

    .other-account {
      color: $gray;
    }

    .icons {
      width: 30px;
      cursor: pointer;
    }

    .input {
      border-radius: 10px;
    }

    .remember {
      color: $lightBlack;
    }

    .blob {
      position: absolute;
      top: -15%;
      left: -12%;
      width: 150px;
      opacity: 0.2;
    }
  }

  .forgotPassword {
    color: $gray;
    text-decoration: none;

    &:hover {
      color: $primary;
      transition: 0.5s ease-in-out;
    }
  }

  .arrow-btn {
    width: 100px;
    border-radius: 15px;
    background: $primary;
    color: #fff;
    font-size: 60px;
    padding: 5px;
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);

    &:hover {
      background: $secondary;
      transition: 0.5s ease-in-out;
      box-shadow: none;
    }
  }

  .register {
    span {
      color: $lightBlack;
    }

    .loginAccount {
      color: $primary;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
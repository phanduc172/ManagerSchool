<template>
  <div>
    <b-card id="cardLogin" class="scale-in-bl">
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
        <h1 class="text-center mb-4">Đăng ký</h1>
        <!-- <h2 class="text-center mb-4">Đăng ký với:</h2>
        <div class="d-flex justify-content-center mb-4">
          <b-img
            :src="require('@/assets/images/google.png')"
            fluid
            class="icons"
          />
          <b-img
            :src="require('@/assets/images/facebook.png')"
            fluid
            class="icons mx-4"
          />
          <b-img
            :src="require('@/assets/images/twitter.png')"
            fluid
            class="icons"
          />
        </div>
        <span class="text-center mb-4 other-account"
          >Hoặc tạo tài khoản riêng của bạn</span
        > -->
        <b-form-group id="input-group-1" label-for="usename" class="mb-2">
          <b-form-input
            id="usename"
            class="input"
            v-model="form.usename"
            type="text"
            placeholder="Họ và tên"
            @focus="clearError('usename')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.usename">
            *
            {{ errors.usename }}
          </div>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="email" class="mb-2">
          <b-form-input
            id="email"
            class="input"
            v-model="form.email"
            type="email"
            placeholder="Email"
            @focus="clearError('email')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.email">
            *
            {{ errors.email }}
          </div>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="password" class="mb-2">
          <b-form-input
            id="password"
            class="input"
            v-model="form.password"
            placeholder="Mật khẩu"
            type="password"
            @focus="clearError('password')"
          ></b-form-input>
          <div class="text-danger mb-2" v-if="errors.password">
            *
            {{ errors.password }}
          </div>
        </b-form-group>
        <div class="d-flex justify-content-center mt-3">
          <button type="submit" class="p-0 border-0 bg-transparent">
            <font-awesome-icon icon="arrow-right" class="arrow-btn" />
          </button>
        </div>

        <div class="d-flex justify-content-center flex-wrap mt-4 register">
          <span class="mr-2">Bạn đã có tài khoản?</span>
          <router-link to="/login" class="loginAccount ms-2"
            >Đăng nhập</router-link
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../common/utils/notifications";
import { validateRegisterForm } from "../../common/utils/validate";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        role_type: "",
      },
      errors: {
        username: "",
        email: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    ...mapActions("auth", ["handleRegister"]),

    async onSubmit() {
      this.errors = validateRegisterForm(this.form);
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      await this.handleRegister({
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        role_type: "student",
        avatar: "avatar.jpg",
      });
      await showSuccessMessage();
      this.$router.push("/login");
      window.location.reload();
    },
    onReset(event) {
      event.preventDefault();
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearError(field) {
      this.$set(this.errors, field, "");
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
      margin-bottom: 10px;
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
    font-size: 40px;
    padding: 5px 10px;
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
  .b-form-group {
    margin-right: 10px;
  }
}
</style>

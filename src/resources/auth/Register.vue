<template>
  <b-container id="mainContainer" align-v="center">
    <b-row align-v="center" align-h="center">
      <b-col md="6" class="mt-5">
        <register-form @submit="onSubmitRegister" ref="registerform"/>
      </b-col>
      <!-- <b-col md="5">
        <b-img
          :src="require('@/assets/images/business-like.png')"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
import RegisterForm from '../../components/auth/RegisterForm.vue';
import { showSuccessMessage } from '../../common/utils/notifications';


export default {
  components: {
    RegisterForm
  },
  methods: {
      ...mapActions("auth",['handleRegister']),
      async onSubmitRegister({ username, email, password, role_type }) {
          await this.handleRegister({ username, email, password, role_type });
          showSuccessMessage();
      },
    }
  };
</script>

<style lang="scss">
#mainContainer {
  width: 100%;
  height: auto;
  position: relative;
}
#page-content-wrapper {
  margin: 0;
  background: url('../../assets/images/bg.jpg');
  background-size: cover;
}
</style>
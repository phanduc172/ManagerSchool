<template>
  <b-container id="mainContainer" align-v="center">
    <b-row align-v="center" align-h="center">
      <b-col md="5">
        <login-form />
      </b-col>
      <b-col md="5">
        <b-img
          :src="require('@/assets/images/business.png')"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LoginForm from '../../components/auth/LoginForm.vue';


export default {
  components: {
    LoginForm
  },
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
  background: url('../../assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
}
</style>
<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
    <b-modal id="modal-prevent-closing" ref="modal" title="Thay đổi mật khẩu">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Nhập mật khẩu cũ" label-for="oldPassword">
          <b-form-input id="oldPassword" v-model="oldPassword"></b-form-input>
        </b-form-group>
        <b-form-group label="Nhập mật khẩu mới" label-for="newPassword">
          <b-form-input id="newPassword" v-model="newPassword"></b-form-input>
        </b-form-group>
        <b-form-group label="Xác nhận mật khẩu mới" label-for="confirmPassword">
          <b-form-input
            id="confirmPassword"
            v-model="confirmPassword"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
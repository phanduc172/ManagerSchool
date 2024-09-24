<template>
  <div class="row p-3 m-3">
    <div class="col-2 mb-3 d-none d-md-block">
      <b-button href="/manager/schedules" variant="success">
        <i class="bx bx-arrow-back"></i>
      </b-button>
    </div>
    <div
      class="col-sm-8 offset-sm-2 col-md-6 offset-md-2 col-lg-4 offset-lg-2 p-4 border rounded shadow-lg bg-white"
    >
      <h4 class="text-center text-success mb-3">
        {{ isEdit ? "Cập nhật lịch học" : "Thêm lịch học" }}
      </h4>
      <form @submit.prevent="onSubmit">
        <div class="form-group mb-3">
          <label for="termSemester" class="form-label">
            Học kì<span class="text-danger">*</span>
          </label>
          <select
            id="termSemester"
            class="form-control me-2"
            v-model="form.termSemester"
            @change="clearError('termSemester')"
          >
            <option value="" disabled selected>Chọn học kì...</option>
            <option v-for="term in termOptions" :key="term.id" :value="term.id">
              Học kì {{ term.term_semester }} - ({{ term.term_from_year }} -
              {{ term.term_to_year }})
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.termSemester">
            * {{ errors.termSemester }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="dayOfWeek" class="form-label">
            Thứ<span class="text-danger">*</span>
          </label>
          <select
            id="dayOfWeek"
            class="form-control me-2"
            v-model="form.dayOfWeek"
            @change="clearError('dayOfWeek')"
          >
            <option value="" disabled selected>Chọn thứ...</option>
            <option v-for="date in dayOfWeekOptions" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.dayOfWeek">
            * {{ errors.dayOfWeek }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="room" class="form-label">
            Phòng học<span class="text-danger">*</span>
          </label>
          <select
            id="room"
            class="form-control me-2"
            v-model="form.room"
            @change="clearError('room')"
          >
            <option value="" disabled selected>Chọn phòng học...</option>
            <option v-for="room in roomOptions" :key="room" :value="room">
              {{ room }}
            </option>
          </select>
          <div class="text-danger mb-2" v-if="errors.room">
            * {{ errors.room }}
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="lesson" class="form-label">
            Tiết học <span class="text-danger">*</span>
          </label>
          <div class="d-flex">
            <select
              id="lessonStart"
              class="form-control me-2"
              v-model="form.lessonStart"
              @change="clearError('lessonStart')"
            >
              <option value="" disabled selected>
                Chọn tiết học bắt đầu...
              </option>
              <option
                v-for="lession in lessionOptions"
                :key="lession"
                :value="lession"
              >
                {{ lession }}
              </option>
            </select>
            <span class="align-self-center">-</span>
            <select
              id="lessonEnd"
              class="form-control ms-2"
              v-model="form.lessonEnd"
              @change="clearError('lessonEnd')"
            >
              <option value="" disabled selected>
                Chọn tiết học kết thúc...
              </option>
              <option
                v-for="lession in lessionOptions"
                :key="lession"
                :value="lession"
              >
                {{ lession }}
              </option>
            </select>
          </div>
          <div class="text-danger mb-2" v-if="errors.lessonStart">
            * {{ errors.lessonStart }}
          </div>
          <div class="text-danger my-2" v-if="errors.messageError">
            * {{ errors.messageError }}
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Cập nhật lịch học" : "Thêm lịch học" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showSuccessMessage } from "../../common/utils/notifications";
import { validateFormSchedule } from "../../common/utils/validate";

export default {
  data() {
    return {
      form: {
        termSemester: "",
        dayOfWeek: "",
        room: "",
        lessonStart: "",
        lessonEnd: "",
      },
      errors: {
        termSemester: "",
        dayOfWeek: "",
        room: "",
        lessonStart: "",
        lessonEnd: "",
      },
      termOptions: [],
      lessionOptions: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      roomOptions: [
        "E101",
        "E102",
        "E103",
        "E104",
        "E105",
        "E106",
        "E201",
        "E202",
        "E203",
        "E204",
        "E205",
        "E206",
      ],
      dayOfWeekOptions: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
      yearOptions: Array.from({ length: 20 }, (_, i) => 2023 + i),
      isEdit: false,
    };
  },
  methods: {
    ...mapActions("term", ["ListTerms", "getTermById"]),
    ...mapActions("schedule", [
      "CreateSchedule",
      "UpdateSchedule",
      "GetDetailSchedule",
    ]),
    async getDetailTerm() {
      const scheduleId = this.$route.params.id;

      const scheduleResponse = await this.GetDetailSchedule(scheduleId);
      const scheduleData = scheduleResponse.data;

      const termId = scheduleData.term_id;

      const termResponse = await this.getTermById(termId);
      const termData = termResponse.data;

      console.log("Dữ liệu lịch học:", scheduleData);
      this.setFormForEdit(scheduleData);

      // Log các options
      console.log("Term Options:", this.termOptions);
      console.log("Day of Week Options:", this.dayOfWeekOptions);
      console.log("Room Options:", this.roomOptions);
    },

    async getAllTerms(page = this.currentPage) {
      const data = await this.ListTerms({ page, limit: this.perPage });
      const term = await this.ListTerms({
        limit: data.data.total,
      });
      this.termOptions = term.data.data;
      console.log("Dữ liệu các học kỳ:", this.termOptions);
    },

    async onSubmit() {
      try {
        this.errors = validateFormSchedule(this.form);
        if (Object.keys(this.errors).length > 0) {
          return;
        }
        const data = {
          term_id: this.form.termSemester,
          day_of_week: this.form.dayOfWeek,
          start_period: this.form.lessonStart,
          end_period: this.form.lessonEnd,
          room: this.form.room,
        };

        console.log("Payload--->", data);
        console.log("Payload:", JSON.stringify(data));

        if (this.isEdit) {
          await this.UpdateSchedule({ data, id: this.$route.params.id });
          showSuccessMessage();
        } else {
          console.log("Bắt đầu thêm");
          await this.CreateSchedule(data);
          console.log("Thêm thành công");
          showSuccessMessage();
        }
        this.$router.push({ name: "schedules" });
      } catch (error) {
        this.errors.messageError = error.response.data.error;
      }
    },
    setFormForEdit(term) {
      this.form.termSemester = term.term_id;
      this.form.dayOfWeek = term.day_of_week;
      this.form.lessonStart = term.start_period;
      this.form.lessonEnd = term.end_period;
      console.log("Giá trị phòng học:", term.room);
      this.form.room = term.room;
      this.isEdit = true;
      this.$nextTick(() => {
        console.log("Giá trị phòng học sau khi cập nhật:", this.form.room);
      });
    },

    clearError(field) {
      this.$set(this.errors, field, "");
    },
  },

  created() {
    this.getAllTerms();
    if (this.$route.params.id) {
      this.isEdit = true;
      this.getDetailTerm();
    }
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>

import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [
    {
      id: 1,
      name: "Mark Voldov",
      gender: "Male",
      birthdate: "21 Tháng 9, 1990",
      phone: "(555) 123-4567",
      address: "1234 Elm Street, Springfield",
      class: "Lớp A",
      homeroomTeacher: "Cô Johnson",
      avatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      name: "Topias Kantola",
      gender: "Male",
      birthdate: "15 Tháng 5, 1995",
      phone: "(555) 987-6543",
      address: "5678 Maple Avenue, Lincoln",
      class: "Lớp B",
      homeroomTeacher: "Thầy Smith",
      avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 3,
      name: "Anaiah Whitten",
      gender: "Male",
      birthdate: "12 Tháng 6, 2000",
      phone: "(555) 234-5678",
      address: "9101 Oak Street, Maplewood",
      class: "Lớp C",
      homeroomTeacher: "Cô Davis",
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 4,
      name: "Wyatt Morris",
      gender: "Female",
      birthdate: "04 Tháng 6, 1992",
      phone: "(555) 345-6789",
      address: "1112 Birch Road, Oakdale",
      class: "Lớp D",
      homeroomTeacher: "Thầy Brown",
      avatar: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 5,
      name: "Eliana Stout",
      gender: "Female",
      birthdate: "01 Tháng 6, 1994",
      phone: "(555) 456-7890",
      address: "1314 Pine Lane, Brookside",
      class: "Lớp E",
      homeroomTeacher: "Cô Wilson",
      avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      id: 6,
      name: "Liam Greene",
      gender: "Male",
      birthdate: "25 Tháng 10, 1988",
      phone: "(555) 567-8901",
      address: "1415 Cedar Street, Woodville",
      class: "Lớp F",
      homeroomTeacher: "Thầy Harris",
      avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 7,
      name: "Ava Martin",
      gender: "Female",
      birthdate: "30 Tháng 11, 1996",
      phone: "(555) 678-9012",
      address: "1617 Willow Avenue, Maplewood",
      class: "Lớp G",
      homeroomTeacher: "Cô Thomas",
      avatar: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 8,
      name: "Noah Brown",
      gender: "Male",
      birthdate: "14 Tháng 12, 1989",
      phone: "(555) 789-0123",
      address: "1819 Fir Lane, Brookside",
      class: "Lớp H",
      homeroomTeacher: "Thầy Martinez",
      avatar: "https://bootdey.com/img/Content/avatar/avatar8.png",
    },
    {
      id: 9,
      name: "Sophia Clark",
      gender: "Female",
      birthdate: "23 Tháng 1, 1997",
      phone: "(555) 890-1234",
      address: "2021 Spruce Street, Oakdale",
      class: "Lớp I",
      homeroomTeacher: "Cô Lee",
      avatar: "https://bootdey.com/img/Content/avatar/avatar9.png",
    },
    {
      id: 10,
      name: "William Johnson",
      gender: "Male",
      birthdate: "11 Tháng 2, 1993",
      phone: "(555) 901-2345",
      address: "2223 Cypress Avenue, Springfield",
      class: "Lớp J",
      homeroomTeacher: "Thầy Kim",
      avatar: "https://bootdey.com/img/Content/avatar/avatar10.png",
    },
    {
      id: 11,
      name: "Isabella Lewis",
      gender: "Female",
      birthdate: "19 Tháng 3, 1998",
      phone: "(555) 012-3456",
      address: "2425 Aspen Road, Lincoln",
      class: "Lớp K",
      homeroomTeacher: "Cô Johnson",
      avatar: "https://bootdey.com/img/Content/avatar/avatar11.png",
    },
    {
      id: 12,
      name: "James Miller",
      gender: "Male",
      birthdate: "07 Tháng 4, 1991",
      phone: "(555) 123-4567",
      address: "2627 Birch Street, Woodville",
      class: "Lớp L",
      homeroomTeacher: "Thầy Smith",
      avatar: "https://bootdey.com/img/Content/avatar/avatar12.png",
    },
    {
      id: 13,
      name: "Mia Wilson",
      gender: "Female",
      birthdate: "26 Tháng 5, 1992",
      phone: "(555) 234-5678",
      address: "2829 Maple Avenue, Maplewood",
      class: "Lớp M",
      homeroomTeacher: "Cô Davis",
      avatar: "https://bootdey.com/img/Content/avatar/avatar13.png",
    },
    {
      id: 14,
      name: "Alexander Martinez",
      gender: "Male",
      birthdate: "03 Tháng 6, 1987",
      phone: "(555) 345-6789",
      address: "3031 Elm Street, Springfield",
      class: "Lớp N",
      homeroomTeacher: "Thầy Brown",
      avatar: "https://bootdey.com/img/Content/avatar/avatar14.png",
    },
    {
      id: 15,
      name: "Amelia Davis",
      gender: "Female",
      birthdate: "17 Tháng 7, 1990",
      phone: "(555) 456-7890",
      address: "3233 Cedar Avenue, Brookside",
      class: "Lớp O",
      homeroomTeacher: "Cô Wilson",
      avatar: "https://bootdey.com/img/Content/avatar/avatar15.png",
    },
  ],
};

const getters = {
  students(state) {
    return state.entries;
  },
};

const actions = {
  async ListStudents(_, query = {}) {
    const response = await axios({
      url: api.ListStudents,
      method: "GET",
      params: query,
    });
    return response;
  },
  async CreateStudent(_, { id, body }) {
    const response = await axios({
      url: api.params("CreateStudent", { id }),
      method: "POST",
      data: body,
    });
    return response;
  },
  async UpdateStudent(_, { id, body }) {
    const response = await axios({
      url: api.params("UpdateStudent", {id}),
      method: "PUT",
      data: body,
    });
    return response;
  },
  async DeleteStudent(_, id) {
    const response = await axios({
      url: api.params("DeleteStudent", {id}),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
  UpdateStudents(state, entries) {
    state.entries = entries;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

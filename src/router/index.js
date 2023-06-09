import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/views/LogoutView.vue"),
  },
  {
    path: "/report_a_bug",
    name: "bugReport",
    component: () => import("@/views/BugReportView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () => import("@/views/StudentView.vue"),
    children: [
      {
        path: "works/:id",
        name: "work",
        component: () => import("@/views/studentPanel/WorkView.vue"),
      },
    ],
  },
  {
    path: "/teacher",
    name: "teacher",
    component: () => import("@/views/TeacherView.vue"),
    children: [
      {
        path: "/teacher/users",
        name: "users",
        component: () => import("@/views/teacherPanel/UsersPanelView.vue"),
      },
      {
        path: "/teacher/groups",
        name: "groups",
        component: () => import("@/views/teacherPanel/GroupsPanelView.vue"),
      },
      {
        path: "/teacher/works",
        name: "works",
        component: () => import("@/views/teacherPanel/WorksPanelView.vue"),
      },
      {
        path: "/teacher/tasks",
        name: "tasks",
        component: () => import("@/views/teacherPanel/TasksPanelView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

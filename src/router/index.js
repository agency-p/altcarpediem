import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: "404",
      component: ()=>import("@/components/coreComponents/404.vue")
    },
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("@/views/AuthView.vue"),
    },
    {
      path: "/diary",
      name: "Diary",
      component: () => import("@/views/DiaryView.vue"),
    },
    {
      path: "/finance",
      name: "Finance",
      component: () => import("@/views/FinanceView.vue"),
    },
    {
      path: "/globetrotting",
      name: "Globetrotting",
      component: () => import("@/views/GlobetrottingView.vue"),
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/views/SettingsView.vue"),
    },
  ],
});

export default router;

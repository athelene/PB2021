import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },

  {
    path: "/main",
    name: "Main",
    component: () =>
      import("../views/Main.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import("../views/Registration.vue"),
  },

  {
    path: "/players",
    name: "Players",
    component: () =>
      import( "../views/Players.vue"),
  },

  {
    path: "/invitations",
    name: "Invitations",
    component: () =>
      import("../views/Invitations.vue"),
  },

  {
    path: "/editplayer",
    name: "Editplayer",
    component: () =>
      import("../views/Editplayer.vue"),
  },

  {
    path: "/message",
    name: "Message",
    component: () =>
      import("../views/Message.vue"),
  },

  {
    path: "/faq",
    name: "Faq",
    component: () =>
      import( "../views/FAQ.vue"),
  },

  {
    path: "/editfaq",
    name: "Editfaq",
    component: () =>
      import("../views/Editfaq.vue"),
  },

  {
    path: "/EventList",
    name: "EventList",
    component: () =>
      import( "../views/EventList.vue"),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

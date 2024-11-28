export const sidebarRoutes = (user) => [
  {
    name: "home",
    icon: "fa6-solid:house",
    route: "/",
  },
  {
    name: "my profile",
    icon: "bi:person-fill",
    route: `/profile/${user?.id}`,
  },
  {
    name: "messages",
    icon: "eva:message-circle-fill",
    route: "/messages",
  },
];

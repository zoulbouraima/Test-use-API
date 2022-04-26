import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import ShopSpa from "../views/ShopSpa.vue";
import NotFound from "../views/404NotFound";
import ArticleDetails from "../views/ArticleDetails.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: "/shop-spa",
        name: "Shop-SPA",
        component: ShopSpa,
        children: [{
                path: "products/:name",
                component: ArticleDetails,
            },
            {
                path: "products/",
                component: NotFound,
            },
        ],
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ("../views/About.vue"),
        children: [{
                path: ":name",
                component: Welcome,
            },
            {
                path: "",
                component: NotFound,
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
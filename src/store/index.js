import Vue from "vue";
import Vuex from "vuex";

import Images from "@/assets/images/main";
import Articles from "@/assets/images/articles/main";

import icons from "@/assets/vendors/font-icons/main.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        images: Images,
        icons: icons,
        mode: "default",
        themes: [{
                name: "default",
            },
            {
                name: "magenta",
            },
            {
                name: "blue",
            },
            {
                name: "green",
            },
            {
                name: "orange",
            },
        ],
    },
    mutations: {},
    actions: {},
    modules: {
        articles: {
            namespaced: true,
            state: () => ({
                items: Articles,
                countItem: 0,
                currency: "€",
                count: 0,
                addedItems: Array(),
                totalAmount: null,
                currentArticle: {},
            }),
            getters: {
                currentArticle: (state) => {
                    return state.currentArticle;
                },
                articlesFilter: (state) => {
                    var arr_final = [];
                    for (let i = 0; i < state.items.length; i++) {
                        if (arr_final.length == 0) {
                            var article_unique = state.items[i];
                            article_unique.others_color = [];
                            arr_final.push(article_unique);
                        } else {
                            if (
                                arr_final.find(
                                    (element) =>
                                    element.name == state.items[i].name
                                ) == undefined
                            ) {
                                article_unique = state.items[i];
                                article_unique.others_color = [];
                                arr_final.push(article_unique);
                            } else {
                                arr_final.forEach(function(element) {
                                    if (element.name == state.items[i].name) {
                                        element.others_color.push(
                                            state.items[i].color
                                        );
                                    }
                                });
                            }
                        }
                    }
                    return arr_final;
                },
            },
            mutations: {
                sumCount: (state, arr) =>
                    (state.countItem = arr.reduce(
                        (accumulator, current) => accumulator + current.count,
                        0
                    )),
                addPropertiesToArticle: (state, infos) => {
                    infos.count = state.count;
                },
                setCurrentArticle: (state, article) => {
                    state.currentArticle = article;
                },
            },
            actions: {
                addToCart({ commit, state }, articleInfos) {
                    if (!articleInfos.count) {
                        commit("addPropertiesToArticle", articleInfos);
                    }

                    articleInfos.count++;
                    articleInfos["subTotalAmount"] =
                        articleInfos["count"] * articleInfos["amount"];
                    if (state.addedItems.length != 0) {
                        // check if item(articleInfos) selected is in state.addedItems array else add it
                        for (let i = 0; i < state.addedItems.length; i++) {
                            if (articleInfos.name == state.addedItems[i].name) {
                                // if item selected is state.addedItems array, replace by item(articleInfos) with same name and new count
                                state.addedItems.splice(i, 1, articleInfos);
                                break;
                            } else {
                                // case where name of item(articleInfos) is not the same as any item name selected in the state.addedItems array
                                if (state.addedItems.length == i + 1) {
                                    state.addedItems.push(articleInfos);
                                }
                            }
                        }
                    } else {
                        // add the first item selected in the state.addedItems array. if it has not been added yet
                        state.addedItems.push(articleInfos);
                    }

                    //increment count items selected
                    commit("sumCount", state.addedItems);

                    console.log(state.addedItems);
                },
                //actSetCurrentArticle({ commit })
            },
        },
    },
});
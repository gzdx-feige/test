import Vue from 'vue';
import Vuex from 'vuex';
import config from './config';

Vue.use(Vuex);

// let height = window.innerHeight;
let height = document.documentElement.clientHeight;

export default new Vuex.Store({
    state: {
        height: height,
        winnerList: [],//获奖名单
        prizeList: [],//已选择的奖项分类
        ...config
    },
    mutations: {
        peopleNumberChange(state, value) {
            state.peopleNumber = value;
        },
        themeTitleChange(state, value) {
            state.themeTitle = value;
        },
        banNumberChange(state, value) {
            state.banNumber = value;
        },
        repeatChange(state, value) {
            state.repeat = value;
        },
        prizeListChange(state, value) {
            for (let i = 0; i < value.length; i++) {
                value[i].remain = value[i].size
            }
            state.prizeList = value;
        },
        appendWinnerList(state, value) {
            state.winnerList.push(value);
            // console.log(state.winnerList);
        },
        clearWinnerList(state) {
            state.winnerList = [];
        }
    },
    getters: {
        prizeListTemp(state) {
            let prizeList = state.prizeList;
            let arr = [];
            for (let i = 0; i < prizeList.length; i++) {
                arr.push(prizeList[i].name);
            }

            return arr;
        },
        getBanNumber(state) {
            if (state.banNumber) {
                return state.banNumber.split(',');
            } else {
                return []
            }
        },
        getRepeatList(state) {
            let winnerList = state.winnerList;
            let arr = [];
            for (let i = 0; i < winnerList.length; i++) {
                arr.push(winnerList[i].luckyNumber);
            }
            return arr;
        }
    }
})
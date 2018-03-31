import Vue from 'vue'
import Vuex from 'vuex';
import {getCurrentIndex, shuffle, floatNumber } from '../util';

Vue.use(Vuex);

/* ==========================================================
 * 					 	Vuex 状态管理
 *	简介：
 *		APP灵魂所在，在这里使用Vuex统一管理页面切换动画，歌曲播放状态，
 *		歌曲进度等信息。所有对于歌曲的操作都通过Vuex来进行全局管理，然后
 *		对相应的变化做出全局改变。
 * ========================================================== */
export default new Vuex.Store({
	modules: {
		// route switch object
        transition: {
            namespaced: true,
            state: {
                transitionName: '',
                action: []
            },
            mutations: {
                setTransition(state, transition) {
                    state.transitionName = transition;
                }
            }
        },
		face: {
			namespaced: true,
			state: {
				// playing song detail msg
                sportType: 0,
                age: 20,
                sex: 0,
                headFile: undefined,
                destPhotoFile: undefined,
                resultPhotoFile: undefined
			},
			mutations: {
				// play or pause music
				setDestPhotoFile(state, file) {
                    state.destPhotoFile = file;
				},
				setResultPhotoFile(state, file) {
                    state.resultPhotoFile = file;
				}
			},
			actions: {
				destPhotoFile({state, dispatch}, file) {
                    commit('setDestPhotoFile', file);
				},
				resultPhotoFile({state, dispatch}, file) {
                    commit('setResultPhotoFile', file);
				}
			}
		}
	}
});

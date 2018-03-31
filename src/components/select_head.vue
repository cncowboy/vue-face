<template>
       <container>
            <grid horizontal="center">
              <grid-item horizontal="center">
                <div id = "avatar"/>
              </grid-item>
            </grid>

            <grid horizontal="center" vertical="middle">
              <grid-item size="1/2" >
                平时运动量：
              </grid-item>
              <grid-item size="1/2" >
                  <mt-picker :slots="slots" @change="onSportTypeChange"></mt-picker>
              </grid-item>
            </grid>

            <grid horizontal="center">
              <grid-item >
                <button  @click="nextStep">确定</button>
              </grid-item>
            </grid>

          </container>
</template>

<script>
	/* ==========================================================
	 * ========================================================== */
	import { apiHandler } from '@/api/index';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import axios from 'axios';
    import {mapGetters,mapState} from 'vuex';
	import store from '../store';
	import { dealHotkey } from '../util';
    import Mavatar from 'mavatar';
    import { Picker } from 'mint-ui';

	export default {
		name: 'select_head',
		created() {
	    },
        mounted: function () {
            window.avatar = new Mavatar({
                el: '#avatar',
                backgroundColor: '#ff6633'
            });
        },
		data() {
			return {
                slots:[
                  {
                    values: ['不动动', '一周运动2次', '每天都运动']
                  }
                ]
			};
		},
        computed:{
            //...mapState(['destPhotoFile'])
        },
		methods: {
			// searching the song by the hotkey
            onSportTypeChange(picker, values) {
            },
            nextStep() {
            },
		},
		watch: {
		},
		components: {
            Mavatar,
		}
	};
</script>

<style lang="sass">

</style>

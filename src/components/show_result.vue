<template>
    <container>
        <grid horizontal="center">
            <grid-item >
                <img :src="resultPhotoFile"  v-bind:class="file-photo" />
            </grid-item>
        </grid>
        <grid horizontal="center">
            <grid-item >
                年龄
            </grid-item>
            <grid-item >
                {{headAge}} 
            </grid-item>
        </grid>
        <grid horizontal="center">
            <grid-item >
                性别
            </grid-item>
            <grid-item >
                {{headGender}}
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
    import PhotoUpload from './PhotoUpload';

	// Vuex Playing Module NameSpace
	const NameSpace = 'playing';

	export default {
		name: 'index',
		created() {
	    },
        mounted: function () {
        },
		data() {
			return {
			};
		},
        computed:{
            ...mapState('face', {
                resultPhotoFile: state => { 
                    console.log('map state result photo file');
                    return state.resultPhotoFile
                },
                headGender: state => state.gender,
                headAge: state => state.age,
            })
            //...mapState(['destPhotoFile'])
        },
		methods: {
			// searching the song by the hotkey
            changeFace() {
                const self = this;
                if (!this.destPhotoFile) return;
                window.avatar.imageClipper(function(dataurl) {
                    const formData = window.avatar.getformData('head', dataurl);
                    formData.append('dest_photo', self.destPhotoFile);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.post('/face_swapper/', formData, config).then( res => {
                        console.log('change face return');
                        self.resultPhotoFile = res.data.data;
                    }).catch( error => {
                        console.log(error);
                    })
                });
            },
		},
		watch: {
            resultPhotoFile(val, oldVal) {
                // is triggered whenever the store state changes
                console.log('watch result photo file change');
            }
		},
		components: {
            PhotoUpload
		}
	};
</script>

<style lang="sass">
  .file-photo {
    position: absolute;
    width: 300px;
    height: 400px;
    top: -50px;
    left: 0;
    z-index: 2;
    opacity: 0;
  }

</style>

<template>
       <container>
            <grid horizontal="center" :style="styleObject">
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
                <mt-button type="primary"  @click="nextStep">查看结果</mt-button>
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
    import { Picker, Toast, Button, Indicator } from 'mint-ui';

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
                styleObject: {
                    paddingTop: '20px'
                },
                slots:[
                  {
                    values: ['不动动', '一周运动2次', '每天都运动']
                  }
                ]
			};
		},
        computed:{
            ...mapState('face', {
                headFile: state => state.headFile,
                headGender: state => state.gender,
                headAge: state => state.age,
            })
            //...mapState(['destPhotoFile'])
        },
		methods: {
			// searching the song by the hotkey
            onSportTypeChange(picker, values) {
            },
            nextStep() {
                const self = this;
                console.log('nextStep');
                if (window.avatar.getfileInfo()) {
                    Indicator.open({
                        text: '处理中...',
                        spinnerType: 'fading-circle'
                    });

                    window.avatar.imageClipper(function(dataurl) {
                        self.$store.dispatch("face/headFile", dataurl);
                        const gender = 'male';
                        const age = 21;
                        self.getFaceInfo(dataurl, result=>{
                            if (result.error_message) {
                                //Toast('识别头像失败:'+result.error_message);
                            } else {
                                console.log(result);
                                const face = result.data.faces[0];
                                const gender = face.attributes.gender.value;
                                const age = face.attributes.age.value;
                                self.$store.dispatch("face/headInfo", 
                                    {'gender': gender,  'age': age});
                            }
                        });

                        self.changeFace(dataurl, gender, age, ret=>{
                            Indicator.close();
                            if (ret.data.code !=0 ) {
                                Toast('处理失败');
                            } else {
                                self.$store.dispatch("face/resultPhotoFile", ret.data.data);
                                //self.resultPhotoFile = ret.data.data;
                                self.$router.push('show_result');
                            }
                        });

                    });
                }else{
                    console.log('has not select head photo');
                    Toast('请选择头像');
                }
            },
            getFaceInfo(fileData, callback) {
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const formData = window.avatar.getformData('image_file', fileData);
                formData.append("api_key", "YHyOFY7mRym--NR9ATiCAV3RVJLHu7id");
                formData.append("api_secret", "eu2J__uxCyp43LK3h6rLRNS2wy7QurFh");
                formData.append('image_base64', fileData);
                formData.append('return_landmark', 0);
                formData.append('return_attributes', 'gender,age');
                const url = '/facepp/v3/detect';//https://api-cn.faceplusplus.com
                axios.post(url, formData, config).then( res => {
                    callback(res);
                }).catch( error => {
                    console.log(error);
                    callback({error_message: '分析头像出错'});
                });

            },
            changeFace(dataUrl, gender, age, callback) {
                const self = this;
                window.avatar.imageClipper(function(dataurl) {
                    const formData = window.avatar.getformData('head', dataUrl);
                    formData.append('gender', gender);
                    formData.append('age', age);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.post('/face_swapper/', formData, config).then( res => {
                        console.log('change face return');
                        callback(res);
                    }).catch( error => {
                        console.log(error);
                        callback({data: {code: -1}});
                    })
                });
            },

            //...mapActions([
            //    'face/headFile',
            //])
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

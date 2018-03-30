<template>
	<div class="page">
		<mt-header fixed
				   title="换头像"
				   class="music-header scroll-header"
				   :style="searchVisible && {top: '-40px'}"></mt-header>
          <container>
            <grid>
              <grid-item size="1/3">
                <div id = "avatar"/>
              </grid-item>
              <grid-item size="1/3">
                <photo-upload @input="handleFileUpload" :value="value"></photo-upload>
              </grid-item>
              <grid-item size="1/3">
                <button  @click="changeFace">更换头像</button>
              </grid-item>
            </grid>
          </container>
		</div>
	</div>
</template>

<script>
	/* ==========================================================
	 * ========================================================== */
	import { apiHandler } from '@/api/index';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import axios from 'axios';
	import store from '../store';
	import { dealHotkey } from '../util';
    import Mavatar from 'mavatar';
    import PhotoUpload from './PhotoUpload';
    import Container from 'vue-fraction-grid/components/Container';
    import Grid from 'vue-fraction-grid/components/Grid';
    import GridItem from 'vue-fraction-grid/components/GridItem';

	// Vuex Playing Module NameSpace
	const NameSpace = 'playing';

	export default {
		name: 'index',
		created() {
	      apiHandler('indexMsg', (response) => {
	        this.indexMsg = response.data;
	        apiHandler('hotkey', (response) => {
		        this.hotkeys = dealHotkey(response.data);
		    });
	      });
	    },
        mounted: function () {
            window.avatar = new Mavatar({
                el: '#avatar',
                backgroundColor: '#ff6633'
            });
        },
		data() {
			return {
                destPhotoFile: undefined
			};
		},
		methods: {
			// searching the song by the hotkey
            handleFileUpload(file) {
              this.destPhotoFile = file;
            },
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
                        console.log(res)
                    }).catch( res => {
                        console.log(res)
                    })
                });
            },
		},
		watch: {
		},
		components: {
            Mavatar,
            PhotoUpload
		}
	};
</script>

<style lang="sass">
	.scroll-header {
		transition: top .5s ease;
	}
	.swiper-container {
		z-index: 0;
		.slider-item {
			@include img-responsive;
		}
		.swiper-pagination-bullet-active {
			background: $white-base;
		}
	}
	.hotkey-wrapper {
		padding: 15px;
		p:first-child {
			font-size: 14px;
			color: rgba(0, 0, 0, 0.5);
			margin-bottom: 10px
		}
		.hotkey-list {
			display: flex;
			flex-wrap: wrap;
			> li {
				font-size: 14px;
				margin-right: 5px;
				margin-bottom: 10px;
				text-align: center;
				padding: 0 10px;
			    height: 30px;
			    line-height: 30px;
				border-radius: 16px;
				border: 1px solid $base-line-color;
				&.speical {
					border-color: $primary-color;
					color: $primary-color;
				}
			}
		}
	}
	.radio-list {
		display: flex;
		justify-content: space-between;
		padding: 20px;
		> li {
			display: flex;
			flex: 1;
			justify-content: center;
		    align-items: center;
			.icon {
				display: inline-block;
				width: 30px;
				height: 30px;
				margin-right: 10px;
			}
			.name {
				font-size: 14px;
			}
		}
	}
	.recommend-wrapper {
		.title {
			text-align: center;
			line-height: 48px;
			font-size: 20px;
		}
		.recommend-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			> li {
				flex-basis: 33%;
				.cover-wrapper {
					position: relative;
					.listen-count {
						position: absolute;
					    top: 100%;
					    margin-top: -16px;
					    font-size: 10px;
					    color: #fff;
					    .listen-icon {
					    	    display: inline-block;
							    width: 10px;
							    height: 10px;
							    margin-left: 3px;
							    margin-right: 3px;
							    background-position: 0 -50px;
							    background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423);
							    background-repeat: no-repeat;
							    background-size: 24px 60px;
					    }
					}
					.listen-play {
				    	    position: absolute;
						    top: 100%;
						    right: 5px;
						    width: 24px;
						    height: 24px;
						    margin-top: -28px;
						    background: url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423');
						    background-repeat: no-repeat;
						    background-size: 24px 60px;
				    }
					img {
						@include img-responsive;
					}
				}
				.song-desc {
					display: block;
					padding: 5px;
					font-size: 12px;
					line-height: 1.2;
					height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>

<template>
    <container>
        <grid>
          <grid-item >
              <span>想看看你10年后的样子吗？</span>
          </grid-item>
        </grid>
        <grid>
          <grid-item >
            <router-link to="/select_head">很想</router-link>
          </grid-item>
        </grid>
    </container>
</template>

<script>
	/* ==========================================================
	 * ========================================================== */
	import { apiHandler } from '@/api/index';
    import {mapGetters,mapState} from 'vuex';
	import store from '../store';

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
        },
		methods: {
		},
		watch: {
		},
		components: {
		}
	};
</script>

<style lang="sass">

</style>

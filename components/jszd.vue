<template>
	<span :startTime="startTime">
		<slot>
			{{content}}
		</slot>
	</span>
</template>
<script>
	import interfaces from '../utils/interfaces.js'
	export default {
		data() {
			return {
				content: '',
			}
		},
		props: {
			startTime: {
				type: String,
				default: ''
			},
		},
		mounted() {
			this.countdowm(this.startTime)
		},
		methods: {
			countdowm(timestamp) {
				let self = this;
				let timer = setInterval(function() {
					let nowTime = new Date();
					let startTime = new Date(timestamp * 1000);
					let t = nowTime.getTime() - startTime.getTime();

					let day = Math.floor(t / 86400000);
					let hour = Math.floor((t / 3600000) % 24);
					let min = Math.floor((t / 60000) % 60);
					let sec = Math.floor((t / 1000) % 60);
					hour = hour < 10 ? "0" + hour : hour;
					min = min < 10 ? "0" + min : min;
					sec = sec < 10 ? "0" + sec : sec;
					let format = '';
					if (day > 0) {
						format = `${day}天${hour}小时${min}分${sec}秒`;
					}
					if (day <= 0 && hour > 0) {
						format = `${hour}小时${min}分${sec}秒`;
					}
					if (day <= 0 && hour <= 0) {
						format = `${min}分${sec}秒`;
					}
					self.content = format;
		
				}, 1000);
			},
		}
	}
</script>

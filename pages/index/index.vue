<template>
	<view>
		<NavBar></NavBar>
		<!--  <view v-for="item in  100" :key="item">
		      {{item}}
		    </view> -->
		<!-- <TabBar></TabBar>> -->
		<view class="video_box">

			<swiper class="container1" duration="200" @change="slide" @click="pauseVideo" vertical
				style="width:100%;background:#000">
				<block v-for="(item, index) in video_list" :key="index">
					<swiper-item style="height:100%; width:100%">
						<!-- <video class="vvideo" id="myVideo" style="height:100%; width:100%" :id="String(item.id)" :src="item.video_src" v-if="index==changeIndex" autoplay="true" 
					></video> -->
						<video object-fit="cover" class="vvideo" id="myVideo" style="height:100%; width:100%"
							:id="String(item.id)" :src="item.video_src" v-show="index==changeIndex" autoplay="true" loop
							show-center-play-btn @pause="pauseTo"></video>
					</swiper-item>
				</block>
			</swiper>
			<cover-view style="height: 90px;width:100%;margin-top: -10%;">qweqweqwe</cover-view>
			<!-- <view @touchend="touchEnd" :animation="animation" @touchstart="touchStart" @touchmove="touchMove"
				class="video_list" v-for="(item, index) in video_list" :data-index="item.id" :id="`myVideo${item.id}`"
				:key="item.id">
				<video :custom-cache="false" :src="item.video_src" :vslide-gesture-in-fullscreen="false" :direction='0'
					:enable-progress-gesture="false" :show-fullscreen-btn="false" object-fit="cover" :id="String(item.id)"></video>
			</view>
 -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				video_list: [{
						id: 0,
						video_src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
					},
					{
						id: 1,
						video_src: 'https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4'
					},
					{
						id: 2,
						video_src: 'http://video.microc.cn/dG1wL3d4MzkwNjg3YjY3OTZjZTMzYS5vNnpBSnMzYTJqaDJHUWRGVllDV2JhaHhjTUFzLkFaeGE2d1NIVTV3cjkyNGFlOGIyMjMxYTgwNjYyOTVhZjY2YTJjN2VjY2MwLm1wNA=='
					},
					{
						id: 3,
						video_src: 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200fce0000bg36q72j2boojh1t030g&line=0'
					},
					{
						id: 4,
						video_src: 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fd10000bfrb9mlpimm72a92fsj0&line=0'
					},
					{
						id: 5,
						video_src: 'http://video.microc.cn/lecturer_iOS_201903181745504660A5DxJE9a.mp4'
					},
					{
						id: 6,
						video_src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
					},
					{
						id: 7,
						video_src: 'https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4'
					},
				],
				labelList: [{
					name: '推荐'
				}, {
					name: '直播'
				}],
				pauseId: '', //记录暂停的视频id
				isPause: false,
				changeIndex: 0,
				autoplay: false,
				pageY: '', // 触摸起始高度坐标
				animation: '', // 视频划动动画
				up_stroke: false, // ture:上划；false：下划
				difference: '', // 拖动的距离
				windowHeight: '', // 屏幕高度
				videoContext: {}
			}
		},
		onLoad() {
			this.windowHeight = wx.getSystemInfoSync().windowHeight
			console.log(' this.windowHeight', this.windowHeight)
			//this.getData()

		},
		methods: {
			async getData() {
				console.log('this.$http', this.$http)
				const label = await this.$http.get_label_list()
				console.log('label', label)
			},
			pauseVideo(e) {
				console.log('e', e)
				this.pauseId = e.target.id
				let videoContext = uni.createVideoContext(this.pauseId);
				//console.log('videoContext', videoContext)
				videoContext.pause();	
				this.isPause = !this.isPause
				
					this.pauseTo()
				
				

			},
			pauseTo(e) {
				console.log(123123,!this.isPause)
				if(!this.isPause){
					let videoContext = uni.createVideoContext(this.pauseId);
					
					videoContext.play();
				}
				


			},
			//划动切换
			slide(e) {

				this.changeIndex = e.detail.current
				console.log(e.detail.current)

				//console.log('this.$refs[`myVideo${this.changeIndex}`]',this.$refs[`myVideo${this.changeIndex}`])
				//this.$refs[`myVideo${this.changeIndex}`].play()
				// for(let i=0;i<this.video_list.length;i++){
				//  if(this.changeIndex ===this.video_list.id){

				//  this.autoplay =true
				//  }else{
				//   this.autoplay = false
				//  }
				// }
				// this.video_list.forEach(item=>{
				// 	console.log(this.changeIndex,item.id)
				// 	if(this.changeIndex === item.id){
				// 		console.log(this.videoContext)
				// 		this.autoplay = true
				// 			this.videoContext.play();
				// 	}else{
				// 			this.videoContext.pause();
				// 	}
				// })
			},
			// 划动起始坐标方法
			touchStart(e) {
				// 开始坐标
				this.pageY = e.touches[0].pageY
			},

			// 划动过程坐标方法
			touchMove(e) {
				let n = e.currentTarget.dataset.index; // 触摸的第几个序号
				let difference = e.touches[0].pageY - this.pageY; // 移动后和起始值的差值
				// 划动动画 -------------------------------------
				let animation = wx.createAnimation({ // 移动动效
					duration: 0,
				});
				animation.top(difference - (n * this.windowHeight)).step()

				this.animation = animation.export() // 动画
				this.up_stroke = difference > 0 ? false : true // 是否上划,
				this.difference = difference // 拖动的距离

			},
			// 划动结束坐标方法
			touchEnd(e) {
				console.log('e', e);
				let n = e.currentTarget.dataset.index;
				let difference = this.difference; // 拖动的距离

				const windowHeight = this.windowHeight; // 屏幕高度
				let that = this;
				// 根据id获取点击元素距顶部高度
				var query = wx.createSelectorQuery();
				let id = '#' + e.currentTarget.id;
				console.log('id', id)
				query.select(id).boundingClientRect(function(rect) { // 获取高度
					if (Math.abs(difference) <= windowHeight / 7) { // 小于1/7回原位置 ---------------------------
						var animation = wx.createAnimation({ // 移动动效
							duration: 100,
						});
						console.log('n', n)
						console.log('windowHeight', windowHeight)
						animation.top(-(n * windowHeight)).step()
						console.log('animation', animation)
						that.animation = animation.export()
						that.up_stroke = false // 重置划动状态
						that.difference = 0 // 重置划动距离

					} else { // 大于1/4，移至拖动的下一个视频 --------------------------------
						var animation = wx.createAnimation({ // 移动动效
							duration: 200,
						});
						console.log('n2', n)
						that.up_stroke ? n++ : n--; // 上划：n+1 下划：n-1
						animation.top(-(n * windowHeight)).step()
						console.log('up_stroke', that.up_stroke)
						that.animation = animation.export()
						that.up_stroke = false // 重置划动状态
						that.difference = 0 // 重置划动距离

					}
				}).exec();
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		@include flex(flex-start, column) color: $base-color
	}

	.home {
		overflow: hidden;
	}

	.container1 {
		height: 100vh;
		width: 100vw;
	}

	.vvideo {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0rpx;
		left: 0;
	}

	.video_box {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #000;
	}

	.video_list {
		width: 100%;
		height: 100vh;
		position: relative;
	}

	.video_list video {
		position: absolute;
		top: 0%;

		width: 100%;
		height: 100%;
		padding: 0;
	}
</style>

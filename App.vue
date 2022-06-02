<script>
	export default {
		onLaunch: function() {
			wx.getSystemInfo({
			   success: (res) => {
				// 获取屏幕高度
				this.screenHeight = res.screenHeight
				// 获取状态栏高度
				this.statusBarHeight = res.statusBarHeight
				// 通过操作系统 确定自定义导航栏高度
				if (res.system.substring(0, 3) == "iOS") {
				 this.navBarHeight = 42
				} else {
				 this.navBarHeight = 44
				}
			   }
			  })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

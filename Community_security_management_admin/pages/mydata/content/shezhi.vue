<template>
	<div>
		<!-- <div class="info">头像</div> -->
		<div class="info">用户名</div>
		<input @input="getname" type="text" placeholder="请输入新用户名">
		<div class="info">密码</div>
		<input @input="getpassword" type="text" placeholder="请输入新密码">
		<div class="info">手机号</div>
		<input @input="getphone" type="text" placeholder="请输入新手机号">
		<div class="button" @click="tolog('/pages/login/log')">切换账号</div>
		<button type="primary" @click="submit">保存</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				password:'',
				phonenum:'',
				time:'',
				_id:''
			}
		},
		methods:{
			getname(e){
				this.username = e.detail
			},
			getphone(e){
				this.phonenum = e.detail
			},
			getpassword(e){
				this.password = e.detail
			},
			onShow() {
				console.log('onshow运行了')
				this.time = this.getTime();
				let user = wx.getStorageSync('user')
				console.log(user)
				this._id = user._id;
			 },
			 getTime:function(){
			 	var date = new Date(),
			 		year = date.getFullYear(),
			 		month = date.getMonth() + 1,
			 		day = date.getDate(),
			 		hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			 		minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			 		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			 		month >= 1 && month <= 9 ? (month = "0" + month) : "";
			 		day >= 0 && day <= 9 ? (day = "0" + day) : "";
			 		var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			 		return timer;
			 	},
				submit(){
					// //校验手机号
					// if (this.phonenum.length < 11) {
					// 	wx.showToast({
					// 		icon: 'none',
					// 		title: '手机号至少11位',
					// 	})
					// 	return
					// }
					// if (this.phonenum.length > 11) {
					// 	wx.showToast({
					// 		icon: 'none',
					// 		title: '手机号最多11位',
					// 	})
					// 	return
					// }
					// //校验密码
					// if (this.idnum.length < 4) {
					// 	wx.showToast({
					// 		icon: 'none',
					// 		title: '密码至少4位',
					// 	})
					// 	return
					// }
					let _id = this._id
					console.log(_id)
					wx.cloud.database().collection('manageuser').doc(_id)
						.update({
						data: {
						 username: this.username,
						 phonenum: this.phonenum,
						 password: this.password,
						},
						success(res) {
							console.log('修改成功', res)
							uni.showToast({
								title: '修改成功',
								duration: 500,
							});
						 }, 
						 fail(res) {
							console.log('修改失败', res)
						}
					})
				},
			 tolog (url) {
				uni.reLaunch({
					url:url
				})
			},
			toback(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	.body{
		width: 100%;
		height: 550px;
	}
	.info{
		margin-left: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.button{
		margin-top: 100px;
		text-align: center;
	}
	input{
		margin-bottom: 30px;
		margin-left: 20px;
		margin-right: 20px;
		border: none;
		border-bottom: 1px solid #ccc;
	}
	button{
		width: 80%;
		height: 50px;
		margin-top: 20px;
	}
</style>
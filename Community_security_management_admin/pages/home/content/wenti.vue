<template>
	<div class="body">
		<div class="info">提交人姓名</div>
		<input @input="getname" type="text" placeholder="请输入提交人姓名" name="username"/>
		<div class="info">问题简述</div>
		<textarea  @input="getproblem" placeholder="请简单描述该问题"></textarea>
		<button type="primary" @click="submit">提交</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				idnum:'',
				username:'',
				problem:'',
				time:''
			}
		},
		methods:{
			onShow() {
				console.log('onshow运行了')
				this.time = this.getTime();
				let user = wx.getStorageSync('user')
				this.idnum = user.idnum
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
			//获取用户名
			  getname(e) {
				  this.username = e.detail
			  },
			  //获取问题
			  getproblem(e) {
				  this.problem = e.detail
			  },
			  
			  //注册
			  submit() {
			  wx.cloud.database().collection('wenti').add({
			   data: {
				idnum: this.idnum,
			    username: this.username,
			    problem: this.problem,
			    time: this.time
			   },
			   success(res) {
			    console.log('登记成功', res)
			    wx.showToast({
			     title: '登记成功',
			    })
			   },
			   fail(res) {
			    console.log('登记失败', res)
			   }
			  })
			  },
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
	input{
		margin-bottom: 30px;
		margin-left: 20px;
		margin-right: 20px;
		border: none;
		border-bottom: 1px solid #ccc;
	}
	textarea{
		margin-bottom: 30px;
		margin-left: 20px;
		margin-right: 20px;
	}
	button{
		width: 80%;
		height: 50px;
		margin-top: 100px;
	}
</style>
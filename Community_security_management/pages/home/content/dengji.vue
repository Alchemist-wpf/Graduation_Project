<template>
	<div class="body">
		<div class="info">姓名</div>
		<input @input="getname" type="text" placeholder="请输入姓名" name="username"/>
		<div class="info">手机号</div>
		<input @input="getphone" type="text" placeholder="请输入手机号" name="phonenumber"/>
		<div class="info">身份证</div>
		<input @input="getid" type="text" placeholder="请输入身份证" name="idnumber"/>
		<div class="info">登记车牌号</div>
		<input @input="getcarnum" type="text" placeholder="请输入车牌号" name="datatime"/>
		<button type="primary" @click="submit">提交</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phonenum:'',
				idnum:'',
				time:'',
				carnum:''
			}
		},
		methods:{
			getname(e){
				this.name = e.detail
			},
			getphone(e){
				this.phonenum = e.detail
			},
			getid(e){
				this.idnum = e.detail
			},
			getcarnum(e){
				this.carnum = e.detail
			},
			onShow() {
				console.log('onshow运行了')
				this.time = this.getTime();
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
				//校验手机号
				if (this.phonenum.length < 11) {
					wx.showToast({
						icon: 'none',
						title: '手机号至少11位',
					})
					return
				}
				if (this.phonenum.length > 11) {
					wx.showToast({
						icon: 'none',
						title: '手机号最多11位',
					})
					return
				}
				//校验身份证号
				if (this.idnum.length < 15) {
					wx.showToast({
						icon: 'none',
						title: '身份证号至少15位',
					})
					return
				}
				if (this.idnum.length > 15) {
					wx.showToast({
						icon: 'none',
						title: '身份证号最多15位',
					})
					return
				}
				wx.cloud.database().collection('dengji').add({
					data: {
					 name: this.name,
					 idnum: this.idnum,
					 phonenum: this.phonenum,
					 carnum: this.carnum,
					 time: this.time,
					},
					success(res) {
						console.log('登记成功', res)
						uni.showToast({
							title: '登记成功',
							duration: 500,
						});
					 }, 
					 fail(res) {
						console.log('登记失败', res)
					}
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
		margin-top: 100px;
	}
</style>
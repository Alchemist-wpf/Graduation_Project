<template>
	<div class="body">
		<div class="info">姓名</div>
		<input @input="getname" type="text" placeholder="请输入姓名" name="username"/>
		<div class="info">周一</div>
		<input @input="getMon" type="text" placeholder="请输入排班" name="Mon"/>
		<div class="info">周二</div>
		<input @input="getTues" type="text" placeholder="请输入排班" name="Tues"/>
		<div class="info">周三</div>
		<input @input="getWed" type="text" placeholder="请输入排班" name="Wed"/>
		<div class="info">周四</div>
		<input @input="getThur" type="text" placeholder="请输入排班" name="Thur"/>
		<div class="info">周五</div>
		<input @input="getFri" type="text" placeholder="请输入排班" name="Fri"/>
		<div class="info">周六</div>
		<input @input="getSat" type="text" placeholder="请输入排班" name="Sat"/>
		<div class="info">周日</div>
		<input @input="getSun" type="text" placeholder="请输入排班" name="Sun"/>
		
		<button type="primary" @click="submit">提交</button>
		<button type="primary" @click="clear">清空排班</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				Mon:'',
				Tues:'',
				Wed: '',
				Thur: '',
				Fri:'',
				Sat:'',
				Sun:'',
				del:'1'
			}
		},
		// computed:{
		// 	startDate(){
		// 		return this.getDate('start');
		// 	},
		// 	EndDate(){
		// 		return this.getDate('end');
		// 	}
		// },
		methods:{
			getname(e){
				this.name = e.detail
			},
			getMon(e){
				this.Mon = e.detail
			},
			getTues(e){
				this.Tues = e.detail
			},
			getWed(e){
				this.Wed = e.detail
			},
			getThur(e){
				this.Thur = e.detail
			},
			getFri(e){
				this.Fri = e.detail
			},
			getSat(e){
				this.Sat = e.detail
			},
			getSun(e){
				this.Sun = e.detail
			},
			onShow() {
				console.log('onshow运行了')
				let user = wx.getStorageSync('user')
			 },
			submit(){
				wx.cloud.database().collection('paiban').add({
					data: {
					 name:this.name,
					 Mon:this.Mon,
					 Tues:this.Tues,
					 Wed: this.Wed,
					 Thur: this.Thur,
					 Fri:this.Fri,
					 Sat:this.Sat,
					 Sun:this.Sun,
					 del:'1'
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
			},
			clear(){
				// let del = this.del
				wx.cloud.database().collection('paiban').where({
					del:'1'
				}).remove({
					success: console.log('删除成功'),
					fail: console.error
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
	.uni-input{
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
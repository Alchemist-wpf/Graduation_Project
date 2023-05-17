<template>
	<div class="body">
		<div class="info">姓名</div>
		<input @input="getname" type="text" placeholder="请输入姓名" name="username"/>
		<div class="info">手机号</div>
		<input @input="getphone" type="text" placeholder="请输入手机号" name="datatime"/>
		<div class="info">申请理由</div>
		<input @input="getreason" type="text" placeholder="请简述申请理由" name="datatime"/>
		
		<div class="info">请假开始时间</div>
		<picker class="picker date" mode="date" :value="startdate" @change="bindStartDateChange">
			<view class="uni-input">{{startdate}}</view>
		</picker>
		<!-- <input type="text" placeholder="请输入请假开始时间" name="starttime"/> -->
		
		<div class="info">请假结束时间</div>
		<picker class="picker date" mode="date" :value="enddate" @change="bindEndDateChange">
			<view class="uni-input">{{enddate}}</view>
		</picker>
		<!-- <input type="text" placeholder="请输入请假结束时间" name="endtime"/> -->
		
		<button type="primary" @click="submit">提交</button>
	</div>
</template>

<script>
	export default{
		data(){
			const currentDate = this.getDate({
				format:true
			});
			return{
				username:'',
				phonenum:'',
				reason:'',
				startdate: currentDate,
				enddate: currentDate,
				time:'',
				checkuser:'',
				checktime:'',
				idnum:'',
				state:'未审批'
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
				this.username = e.detail
			},
			getphone(e){
				this.phonenum = e.detail
			},
			getreason(e){
				this.reason = e.detail
			},
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
			bindStartDateChange: function(e){
				this.startdate = e.target.value;
			},
			bindEndDateChange: function(e){
				this.enddate = e.target.value;
			},
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
			
					if (type === 'start') {
						year = year - 60;
					} else if (type === 'end') {
						year = year + 2;
					}
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
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
				wx.cloud.database().collection('qingjia').add({
					data: {
					 idnum: this.idnum,
					 username: this.username,
					 phonenum: this.phonenum,
					 reason: this.reason,
					 startdate: this.startdate,
					 enddate: this.enddate,
					 time: this.time,
					 state:this.state,
					 checkuser:'',
					 checktime:'',
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
<template>
	<div>
		<!-- 未登录状态 -->
		<div v-if="!loginOK">
			<div class="icon-user" style="background-image: url(/static/底图.png);">
				<img class="headicon" src="/static/非人大事项.png">
				<div class="username">未登录</div>
			</div>
			<div class="function-list">
				<!-- <div class="button" @click="toback('/pages/mydata/content/paiban')">本周排班</div>
				<div class="button" @click="toback('/pages/mydata/content/shichang')">考勤时长</div>
				<div class="button" @click="toback('/pages/mydata/content/jilu')">请假记录</div>
				<div class="button" @click="toback('/pages/mydata/content/fankui')">我的反馈</div> -->
				<div class="logoutbutton" @click="tolog('/pages/login/log')">登录</div>
			</div>
		</div>
		<!-- 登录状态 -->
		<div v-else>
			<div class="icon-user" style="background-image: url(/static/底图.png);">
				<img class="headicon" src="/static/非人大事项.png">
				<div class="username">{{name}}</div>
				
			</div>
			<div class="function-list">
				<div class="userbutton" @click="toback('/pages/mydata/content/guestdata')">来客登记表</div>
				<div class="userbutton" @click="toback('/pages/mydata/content/paiban')">本周排班</div>
				<div class="userbutton" @click="toback('/pages/mydata/content/shichang')">考勤统计</div>
				<div class="userbutton" @click="toback('/pages/mydata/content/jilu')">请假审批</div>
				<div class="userbutton" @click="toback('/pages/mydata/content/fankui')">问题反馈</div>
				<div class="userbutton" @click="toback('/pages/mydata/content/shezhi')">设置</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				loginOK:false,
				name:'user',
			}
		},
		methods:{
			 onShow() {
				 console.log('onshow运行了')
			    let user = wx.getStorageSync('user')
				console.log(user)
			    if (user && user.username) {
			        this.loginOK= true;
			        this.name=user.username.value;
			    } else {
			        this.loginOK= false;
			    }
				console.log(this.name)
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

<style lang="scss">
	.icon-user{
		width: 100%;
		height: 150px;
		background-color: antiquewhite;
		display: flex;
		flex-direction: column;
		.headicon{
			margin-top: 10%;
			align-self: center;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: white;
		}
		.username{
			align-self: center;
			margin: auto 0;
			text-align: center;
			height: 50px;
			width: 100px;
			line-height: 50px;
		}
	}
	.function-list{
		width: 100%;
		height: calc(100vh - 150px);
		display: flex;
		flex-direction: column;
		.logoutbutton{
			margin-top: 93%;
			width: 100%;
			height: 60px;
			flex: 1;
			line-height: 50px;
			text-align: center;
			border: 1px solid transparent;
			border-color:  rgba(151, 151, 151, 0.3);
		}
		.userbutton{
			width: 100%;
			// height: 20%px;
			flex: 1;
			line-height: 50px;
			text-align: center;
		}
	}
</style>
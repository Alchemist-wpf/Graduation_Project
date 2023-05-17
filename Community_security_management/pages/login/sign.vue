<template>
	
	<view class="v1">
	 
	<!-- v2父容器  子view使用绝对布局 -->
	  <view class="v2">
	    <view class="dltext">注册</view>
		
		<!-- 用户名 -->
		<view class="nameCs">
		  <input @input="getname" placeholder="请输入姓名" />
		</view>
	 
	    <!-- 手机号 -->
	    <view class="phoneCs">
	      <input @input="getphone" name="value" placeholder="请输入手机号" />
	    </view>
		
		<!-- 身份证号 -->
		<view class="idnumCs">
		  <input @input="getidnum" name="value" placeholder="请输入身份号" />
		</view>
	 
	    <!-- 密码 -->
	    <view class="passwordCs">
	      <input @input="getpassword" name="value" placeholder="请输入密码" />
	    </view>
		
	 
	    <!-- 注册按钮 -->
	    <view class="zhuce">
	      <button class="btn-dl" type="primary" @click="login">注册</button>
	    </view>
	 
	  </view>
	 
	 
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				username:{},
				realname:'',
				phonenum:'',
				password:'',
				idnum:''
			}
		},
		methods:{
			//获取用户名
			  getname(e) {
				  this.realname = e.detail
			  },
			  //获取用户手机号
			  getphone(e) {
				  this.phonenum = e.detail
			  },
			  //获取身份证号
			  getidnum(e) {
					this.idnum = e.detail
			  },
			  // 获取密码
			  getpassword(e) {
				  this.password = e.detail
			  },
			  
			  //注册
			  login(event) {
				  let phonenum = this.phonenum
				  let username = this.username
				  let password = this.password
				  let realname = this.realname
				  let idnum = this.idnum
				  //校验手机号
				  if (phonenum.length < 11) {
				   wx.showToast({
					icon: 'none',
					title: '手机号至少11位',
				   })
				   return
				  }
				  if (phonenum.length > 11) {
				   wx.showToast({
					icon: 'none',
					title: '手机号最多11位',
				   })
				   return
				  }
				  //校验身份证
				  if (idnum.length < 18) {
				   wx.showToast({
					icon: 'none',
					title: '身份证号至少18位',
				   })
				   return
				  }
				  if (idnum.length > 18) {
				   wx.showToast({
				  	icon: 'none',
				  	title: '身份证号最多18位',
				   })
				   return
				  }
				  //校验密码
				  if (password.length < 4) {
				   wx.showToast({
					icon: 'none',
					title: '密码至少4位',
				   })
				   return
			  }
			  //注册功能的实现
			  wx.cloud.database().collection('user').add({
			   data: {
			    username: username,
			    phonenum: phonenum,
			    password: password,
				realname: realname,
				idnum: idnum
			   },
			   success(res) {
			    console.log('注册成功', res)
			    wx.showToast({
			     title: '注册成功',
			    })
			    uni.reLaunch({
			     url: '../login/log',
			    })
			   },
			   fail(res) {
			    console.log('注册失败', res)
			   }
			  })
			  },
			tolog(url){
				uni.reLaunch({
					url:url
				})
			}
		}
	}
</script>

<style>
	.v1{
	  display: block;
	  position:absolute;
	  height: 100%;
	  width: 100%;
	  background: #356363;
	  /* 换图片 */
	  
	}
	/* 白色区域 */
	.v1 .v2{
	  position: relative;
	  margin-top: 150rpx;
	  left: 100rpx; 
	  width: 545rpx;
	  height: 1000rpx;
	  background: #FFFFFF;
	  border-radius: 50rpx;
	}
	/* 白色区域内的登录文本 */
	.v1 .v2 .dltext{
	  margin-top: 50rpx;
	  position: absolute;
	  margin-left:80rpx;
	  width: 150rpx;
	  height: 100rpx;
	  font-size: 60rpx;
	  font-family: Helvetica;
	  color: #000000;
	  line-height: 100rpx;
	  letter-spacing: 2rpx;
	}
	/* 用户名图片+输入框+下划线的父容器view */
	.v1 .v2 .nameCs{
	  margin-top: 150rpx;
	  margin-left: 35rpx;
	  position: absolute;
	  display: flex;
	  width:450rpx ;
	  height: 80rpx ;
	  border-bottom: 3rpx solid rgb(58, 57, 57);
	}
	/* 手机号输入框 */
	.v1 .v2 .nameCs input{
	  width: 200rpx;
	  font-size: 25rpx ;
	  margin-top: 20rpx;
	  margin-left: 30rpx;
	}
	/* 手机图标+输入框+小眼睛图标+下划线父容器view */
	.v1 .v2 .phoneCs{
	  margin-top: 300rpx;
	  margin-left: 35rpx;
	  position: absolute;
	  display: flex;
	  width:450rpx ;
	  height: 80rpx ;
	  border-bottom: 3rpx solid rgb(58, 57, 57);
	}
	/* 手机输入框 */
	.v1 .v2 .phoneCs input{
	  width: 200rpx;
	  font-size: 25rpx ;
	  margin-top: 15rpx;
	  margin-left: 30rpx;
	}
	/* 身份证图标+输入框+小眼睛图标+下划线父容器view */
	.v1 .v2 .idnumCs{
	  margin-top: 450rpx;
	  margin-left: 35rpx;
	  position: absolute;
	  display: flex;
	  width:450rpx ;
	  height: 80rpx ;
	  border-bottom: 3rpx solid rgb(58, 57, 57);
	}
	/* 身份证输入框 */
	.v1 .v2 .idnumCs input{
	  width: 200rpx;
	  font-size: 25rpx ;
	  margin-top: 15rpx;
	  margin-left: 30rpx;
	}
	/* 密码图标+输入框+下划线父容器view */
	.v1 .v2 .passwordCs{
	  margin-top: 600rpx;
	  margin-left: 35rpx;
	  position: absolute;
	  display: flex;
	  width:450rpx ;
	  height: 80rpx ;
	  border-bottom: 3rpx solid rgb(58, 57, 57);
	}
	/* 密码输入框 */
	.v1 .v2 .passwordCs input{
	  width: 200rpx;
	  font-size: 25rpx ;
	  margin-top: 15rpx;
	  margin-left: 30rpx;
	}
	
	/* 注册按钮容器view */
	.v1 .v2 .zhuce{
	  width: 350rpx;
	  height: 50rpx;
	  position: absolute;
	  margin-top: 800rpx;
	  margin-left: 85rpx;
	  
	}
	/* 注册按钮 */
	.v1 .v2 .zhuce button{
	  padding: 0rpx;
	  line-height: 50rpx;
	  font-size: 25rpx;
	  width: 100%;
	  height: 100%;
	  border-radius: 30rpx;
	}

	/* 提示文本 */
	.v3{
	  padding-left: 100rpx;
	  display: flex;
	  position: relative;
	  width: 100%;
	  height: 60rpx;
	  padding-top: 50rpx;
	}
	.v3 .line{
	  margin-left: 5rpx;
	  margin-top: 18rpx;
	  width: 120rpx;
	  height: 3rpx;
	 background-color:#FFFFFF;
	}
	.v3 .lText{
	  color: #FFFFFF;
	  font-size: 25rpx;
	}
</style>
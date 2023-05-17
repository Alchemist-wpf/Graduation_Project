<template>
	 <view>
	   <uni-section title="社区" type="line">
	         <uni-card title="选点">
	           <button @tap="chooseLocation">请在地图中选择社区的位置</button>
	           <view v-if="isChooseTarget" class="info">
	             <view>{{ schoolInfo.address }}</view>
	             <view>{{ `（${schoolInfo.latitude}，${schoolInfo.longitude}）` }}</view>
	           </view>
	         </uni-card>
	      </uni-section>
	   <uni-section v-if="isChooseTarget" title="员工" type="line">
	        <uni-card title="当前位置实时信息">
	           <template v-slot:title>
	             <uni-list>
	               <uni-list-item title="当前位置实时信息">
	                 <template v-slot:footer v-if="isAuth === 0">
	                   <text @tap="reGrantAuth" class="text">重新授权</text>
	                 </template>
	               </uni-list-item>
	             </uni-list>
	           </template>
			   <view class="block">
			             <view class="title">经纬度：</view>
			             <view class="value">
			               <text v-if="!loading">{{ jwText || '-' }}</text>
			               <view v-else class="loading">
			                 <uni-icons type="spinner-cycle" size="20"/>
			               </view>
			             </view>
			           </view>
			   <view class="block">
			     <view class="title">详细地址：</view>
			     <view class="value">
			       <text v-if="!loading">{{ studentInfo.address || '-' }}</text>
			       <view v-else class="loading">
			         <uni-icons type="spinner-cycle" size="20"/>
			       </view>
			     </view>
			   </view>
	         <!-- <view class="block">
	                    <view class="title">距离学校距离：</view>
	                    <view class="value">
	                      <text v-if="!loading">{{ distanceToText || '-' }}</text>
	                      <view v-else class="loading">
	                        <uni-icons type="spinner-cycle" size="20"/>
	                      </view>
	                    </view>
	                  </view> -->
	                  <view class="block">
	                    <view class="title">是否可打卡：</view>
	                    <view class="value">
	                      <text v-if="studentInfo.distance > 500 || studentInfo.distance === ''">否</text>
	                      <view @click="punchClock" v-else class="button">打卡</view>
	                    </view>
	                  </view>
	          </uni-card>
	       </uni-section>
	  </view>
</template>

<script>
	
	/**
	 * 根据经纬度获取两点距离
	 * @param la1 第一个坐标点的纬度 如：24.445676
	 * @param lo1 第一个坐标点的经度 如：118.082745
	 * @param la2 第二个坐标点的纬度
	 * @param lo2 第二个坐标点的经度
	 * @return { Object } { km: 千米/公里, m: 米 }
	 * @tips 注意经度和纬度参数别传反了, 一般经度为0~180、纬度为0~90
	 */
	export function calcDistanceLL(la1, lo1, la2, lo2) {
	    let La1 = la1 * Math.PI / 180.0;
	    let La2 = la2 * Math.PI / 180.0;
	    let La3 = La1 - La2;
	    let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
	            Lb3 / 2), 2)));
	            
	    s = s * 6378.137;
	    s = Math.round(s * 10000) / 10000;
	
	  return {
	    km: s,
	    m: Math.round(s * 1000)
	  };
	}
	
	
	import { getLocationAuth } from '@/utils/location';
	const QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js')
	export default {
	  data() {
	      return {
			name:'',
			time:'',
			phonenum:'',
			idnum:'',
	        schoolInfo: {
	          latitude: '',
	          longitude: '',
	          address: '',
	        }, 
			loading: false,
			  isAuth: -1, // -1: 未授权  0: 拒绝授权  1:已授权
			  studentInfo: {
				latitude: '',
				longitude: '',
				address: '',
				distance: '',
			  },
			  mainInfo:{
				  distance:'',
			  },
			  mapInstance:null,
	      }
	    },
		 computed: {
			distanceToText() {
			       if(this.mainInfo.distance !== '') {
			         return `${this.mainInfo.distance} 米`;
			       }
			       return '';
			     },
		    isChooseTarget() {
		      return this.schoolInfo.latitude && this.schoolInfo.longitude
		    }, 
			jwText() {
			  const { latitude, longitude } = this.studentInfo;
			  if(latitude && longitude) return `（${latitude}，${longitude}）`;
			  return ''
			},
		 },
		  async onLoad() {
			  this.mapInstance = new QQMapWX({
				  key: 'GERBZ-5J5EX-I5V4N-ZG6GG-BHBRQ-7CFHX',
			  })
		      if(!await getLocationAuth()) {
		        this.isAuth = 0;
		      }
		    },
	   methods: {
		   onShow() {
				console.log('onshow运行了')
				this.time = this.getTime();
				let user = wx.getStorageSync('user')
				this.name=user.username.value;
				this.phonenum=user.phonenum.value;
				this.idnum = user.idnum.value;
				console.log(user.username)
				console.log(this.name)
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
						// var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
						var timer = year + '-' + month + '-' + day;
						return timer;
					},
		   punchClock() {
				 wx.cloud.database().collection('daka').add({
					 data: {
					  username: this.name,
					  time: this.time,
					  phonenum: this.phonenum,
					  idnum: this.idnum
					 },
					 success(res) {
						console.log('打卡成功', res)
						uni.showToast({
					    title: '打卡成功',
					    duration: 500,
						});
					  }
				 })
		       },
	      // 选点
	      chooseLocation() {
	        uni.chooseLocation({
	          success: async res => {
	            this.schoolInfo.latitude = res.latitude;
	            this.schoolInfo.longitude = res.longitude;
	            this.schoolInfo.address = res.address;
	          // 判断是否授权
	            const authRes = await getLocationAuth(true);
	            if(authRes) {
	              // 获取用户当前位置
	              this.getLocationInfo();
	              this.isAuth = 1;
	            }else {
	              this.isAuth = 0;
	            }
			  }
	        });
	      },
		   // 获取当前位置信息
		       getLocationInfo() {
		            this.loading = true;
		            uni.getLocation({
		              type: 'gcj02',
		              success: ({ latitude, longitude }) => {
		                this.studentInfo.latitude = latitude;
		                this.studentInfo.longitude = longitude;
		                // 经纬度转成具体地址
		                this.mapInstance.reverseGeocoder({
		                  location: { latitude, longitude },
		                  success: res => {
		                    this.studentInfo.address = res.result.formatted_addresses.recommend;
		                    // 计算两个经纬度之间的距离
		                    const distance = calcDistanceLL(
		                      this.schoolInfo.latitude,
		                      this.schoolInfo.longitude,
		                      latitude,
		                      longitude,
		                    );
		                    this.studentInfo.distance = distance.m;
		                    this.loading = false;
		                  }
		                });
		              }
		            });
		          },
				  async reGrantAuth() {
				   const authRes = await getLocationAuth();
				        if(authRes) {
				          uni.showToast({
				            title: '已授权',
				            duration: 500,
				            icon: 'none'
				          });
				        }else {
				          wx.openSetting({
				            success: (res) => {
				              if(res.authSetting['scope.userLocation']) {
				                this.getLocationInfo();
				                this.isAuth = 1;
				              }
				            },
				          })
						}
			  }
	    },
		}
</script>

<style>
	.info{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	  margin-top: 20rpx;
	}
	.block{
	  margin-bottom: 20rpx;
	}
	.title{
	  color: #000;
	  font-weight: bold;
	}
	.value{
	  width: 100%;
	  min-height: 40rpx;
	}
	.text{
	  font-size: 24rpx;
	  color: #287DE1;
	}
	.loading {
	  width: 40rpx;
	  height: 40rpx;
	  transform: rotate(360deg);
	  animation: rotation 3s linear infinite;
	}
	@keyframes rotation{
	  0%{
	    transform: rotate(0deg);
	  }
	  100%{
	    transform: rotate(360deg);
	  }
	}
	.button{
		height: 60rpx;
		color: #fff;
		line-height: 60rpx;
		text-align: center;
		background-color: #287DE1;
		border-radius: 4rpx;
		font-size: 20rpx;
		width: 30%;
		margin:auto;
	}
</style>
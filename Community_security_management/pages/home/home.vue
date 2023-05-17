<template>
	<div>
		<div class="home">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item">
					<img :src="item.id" style="width: 100%;">
				</view>
			</swiper-item>
		</swiper>
		</div>
		<div class='homelist'>
			<ol class='list'>
				<li @click="toback('/pages/home/content/daka')">考勤打卡</li>
				<li @click="toback('/pages/home/content/qingjia')">请假审批</li>
				<li @click="toback('/pages/home/content/dengji')">来客登记</li>
				<li @click="toback('/pages/home/content/wenti')">社区问题</li>
			</ol>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		methods:{
			onShow(){
				wx.cloud.database().collection('lunbotu').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.name,id:i.fileID})
							n+=1
						}
						this.list = a
						console.log('list',this.list)
					},
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

<style lang="scss">
	.home{
		width: 100%;
		height: 200px;
		background-color: skyblue;
		swiper{
			width: 100%;
			height: 200px;
			swiper-item{
				width: 100%;
				height: 200px;
				background-color: wheat;
			}
		}
	}
	.homelist{
		ol{
			margin-top: 3px;
			margin-left: 3px;
			display: flex;
			flex-wrap: wrap;
			height: calc(100vh - 200px);
			li{
				display: flex;
				width: 49.7%;
				height: 49.7%;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			li:nth-child(1){
				border-right: 1px solid rgba(0, 0, 0, .3);
				border-bottom: 1px solid rgba(0, 0, 0, .3);
			}
			li:nth-child(2){
				border-bottom: 1px solid rgba(0, 0, 0, .3);
			}
			li:nth-child(3){
				border-right: 1px solid rgba(0, 0, 0, .3);
			}
		}
	}
</style>
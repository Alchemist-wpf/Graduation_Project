<template>
	<view>
		<uni-list v-for="(item,index) in list" :key="index">
			<uni-list-item  :title="'用户姓名:'+item.name" :note="'手机号:'+item.phonenum+'身份证号:'+item.id.value"></uni-list-item>
			<button class="button" @click="del(index)">删除</button>
			<button class="button" type="primary" @click="toback('/pages/home/content/dengji_detail')">修改</button>
		</uni-list>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				list:[],
			}
		},
		methods:{
			onShow(){
				wx.cloud.database().collection('user').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.realname.value,phonenum:i.phonenum.value,id:i.idnum})
							n+=1
						}
						this.list = a
						console.log('list',this.list)
					},
				 })
			},
			del(index){
				let list = this.list
				wx.cloud.database().collection('user').where({
					idnum:list[index].id
				}).remove({
					success: console.log('删除成功'),
					fail: console.error
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
	.button{
		margin: 5rpx auto;
		padding: 0;
		width: 25%;
		font-size: 20rpx;
	}
</style>
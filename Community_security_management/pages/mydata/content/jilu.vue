<template>
	<uni-list>
	    <uni-list-item v-for="(item,index) in list" :key="index" :title="'审核状态:'+item.state" :note="'申请时间:'+item.time"></uni-list-item>
	</uni-list>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					// {
					// 	name:'测试1',
					// 	time:'2023-3-25',
					//   state:''
					// },
					// {
					// 	name:'测试2',
					// 	time:'2023-3-25'
					// },
					// {
					// 	name:'测试3',
					// 	time:'2023-3-25'
					// }
				],
				name:'',
				time:'',
				state:'',
				idnum:''
			}
		},
		methods:{
			onShow(){
				let user = wx.getStorageSync('user')
				let idnum = user.idnum
				wx.cloud.database().collection('qingjia').where({
					idnum:idnum
				 }).get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.username.value,time:i.time,state:i.state})
							n+=1
						}
						this.list = a
						console.log('list',this.list)
					},
				 })
			}
		}
	}
</script>

<style>
	
</style>
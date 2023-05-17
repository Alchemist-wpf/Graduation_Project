<template>
	<uni-list>
	    <uni-list-item v-for="(item,index) in list" :key="index" :note="'提交时间:'+item.time" :title="'提交问题:'+item.problem"></uni-list-item>
	</uni-list>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
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
				wx.cloud.database().collection('wenti').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.username.value,time:i.time,problem:i.problem.value})
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
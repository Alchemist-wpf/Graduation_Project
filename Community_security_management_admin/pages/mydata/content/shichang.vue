<template>
	<uni-list>
	    <uni-list-item v-for="(item,index) in list" clickable="true" link="navigateTo" @click="check(index)" :key="index" :title="'姓名:'+item.name" :note="'身份证号:'+item.idnum"></uni-list-item>
	</uni-list>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				name:'',
				idnum:''
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
							a.push({name:i.username.value,time:i.time,idnum:i.idnum.value})
							n+=1
						}
						this.list = a
						console.log('list',this.list)
					},
				 })
			},
			check(index){
				let list = this.list
				console.log(list[index])
				let idnum = list[index].idnum
				console.log(idnum)
				uni.navigateTo({
					url:'/pages/mydata/content/shichang_detail?idnum= this.idnum'
				})
			}
		}
	}
</script>

<style>
	
</style>
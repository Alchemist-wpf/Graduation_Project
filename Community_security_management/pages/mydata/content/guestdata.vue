<template>
	<uni-list>
	    <uni-list-item v-for="(item,index) in list" :key="index" :title="'姓名:'+item.name" :note="'身份证号:'+item.idnum+'手机号:'+item.phonenum+'车牌号:'+item.carnum+'登记时间:'+item.time"></uni-list-item>
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
				// let user = wx.getStorageSync('user')
				// let idnum = user.idnum
				wx.cloud.database().collection('dengji').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.name.value,idnum:i.idnum.value,phonenum:i.phonenum.value,carnum:i.carnum.value,time:i.time})
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
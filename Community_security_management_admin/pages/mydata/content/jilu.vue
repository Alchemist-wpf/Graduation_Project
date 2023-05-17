<template>
	<view>
		<uni-list v-for="(item,index) in list" :key="index">
	    <uni-list-item  :title="'审核状态:'+item.state" :note="'请假开始时间:'+item.startdate+'请假结束时间:'+item.enddate+'申请人:'+item.name+'申请时间:'+item.time"></uni-list-item>
		<button type="primary" class="button" @click="check(index)">审批</button>
	</uni-list>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				checkuser:'',
				checktime:'',
				name:'',
				time:'',
				state:'',
				startdate:'',
				enddate:'',
				idnum:''
			}
		},
		methods:{
			onShow(){
				this.checktime = this.getTime();
				let user = wx.getStorageSync('user')
				this.checkuser = user.realname.value
				console.log(this.checkuser)
				wx.cloud.database().collection('qingjia').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({name:i.username.value,time:i.time,state:i.state,startdate:i.startdate,enddate:i.enddate,idnum:i.idnum})
							n+=1
						}
						this.list = a
						console.log('list',this.list)
					},
				 })
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
						// var timer = year + '-' + month + '-' + day;
						return timer;
			},
			check(index){
				let list = this.list
				console.log(list[index])
				let idnum = list[index].idnum
				console.log(idnum)
				wx.cloud.database().collection('qingjia').where({idnum:idnum})
				.update({
					data:{
						state:"审批通过",
						checkuser: this.checkuser,
						checktime: this.checktime
					}
				})
			}
		}
	}
</script>

<style>
	
</style>
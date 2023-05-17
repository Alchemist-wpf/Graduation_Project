<template>
	<wyb-table ref="table" :headers="headers" :contents="contents" height="600rpx" :url-col="urlCol" />
</template>

<script>
	import wybTable from '@/components/wyb-table/wyb-table.vue'
	export default {
	    components: {
	        wybTable
	    },
	    data() {
	        const theUrl = '/pages/demos/noticeBar-demo/more' // 本地的某个页面
	        const httpUrl = 'https://ext.dcloud.net.cn/plugin?id=2667' // 某个网址
	        return {
	            headers: [{
	                label: '姓名',
	                key: 'name'
	            }, {
	                label: '周一',
	                key: 'Mon'
	            }, {
	                label: '周二',
	                key: 'Tues'
	            }, {
	                label: '周三',
	                key: 'Wed'
	            }, {
	                label: '周四',
	                key: 'Thur'
	            }, {
	                label: '周五',
	                key: 'Fri'
	            },{
	                label: '周六',
	                key: 'Sat'
	            },{
	                label: '周日',
	                key: 'Sun'
	            }],
				contents: [],
	            // contents: [{
	            //     name: '刘一',
	            //     age: '',
	            //     collage: '信息学院',
	            //     score: '99',
	            //     url: ['查看更多', theUrl],
	            //     link: ''
	            // }, {
	            //     name: '陈二',
	            //     age: '18',
	            //     collage: '商学院',
	            //     score: '98',
	            //     url: ['我带参数', theUrl, {name: '陈二'}],
	            //     link: ''
	            // }, {
	            //     name: '张三',
	            //     age: '22',
	            //     collage: '统计与数学学院',
	            //     score: '97',
	            //     url: ['查看更多', theUrl],
	            //     link: ''
	            // }],
	            urlCol: [{
	                type: 'route',
	                key: 'url'
	            }, {
	                type: 'http',
	                key: 'link'
	            }]
	        }
	    },
		methods:{
			onShow(){
				wx.cloud.database().collection('paiban').get({
					success:(res)=>{
						console.log("获取数据成功", res)
						let array = res.data
						var a=[];
						var n = 0;
						for(const i of array){
							// console.log(i.username.value)
							a.push({
								name:i.name.value,
								Mon:i.Mon.value,
								Tues:i.Tues.value,
								Wed:i.Wed.value,
								Thur:i.Thur.value,
								Fri:i.Fri.value,
								Sat:i.Sat.value,
								Sun:i.Sun.value
								})
							n+=1
						}
						this.contents = a
						console.log('contents',this.contents)
					}
				})
			}
		}
	}
</script>

<style>
</style>
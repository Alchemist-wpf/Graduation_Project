<template>
	<view>
	        <uni-calendar :insert="true" :lunar="true" :date="date" :selected="selected" :start-date="'2022-5-2'" :end-date="'2035-5-20'"
	         @change="change"></uni-calendar>
	    </view>
</template>

<script>
	// import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
    export default {
            // components: {
            //     uniCalendar
            // },
            data() {
                return {
					// selected: [{
					//     date: "2023-03-21"
					//     }, {
					//         date: '2023-3-3'
					//     }, {
					//         date: '2023-3-4'
					//     }, {
					//         date: '2023-3-6'
					//     }],
                    selected: [],
					idnum:''
                };
            },
            methods: {
                // getList() {
                //     uni.request({
                //         url: 'http://localhost:3000/data3',
                //         success: (res) => {
                //             console.log(res.data);
                //             this.selected = res.data.selected;
                //         }
                //     });
                // },
				
				
				
				onLoad() {
				    // this.getList();
					let user = wx.getStorageSync('user')
					let idnum = user.idnum
					// let list = this.selected
					// console.log('onshow',list)
					wx.cloud.database().collection('daka').where({
						idnum:idnum.value
					 }).get({
						 success:(res)=>{
							 console.log("获取数据成功", res)
							 let array = res.data
							 var a=[];
							 var n = 0;
							 // let list = this.list
							 for(const i of array){
								 a.push({date:i.time})
								 n+=1
							 }
							 this.selected = a
							 console.log('selected',this.selected)
							 console.log('a',a)
							 // console.log('数据',this.selected)
						 }
					 })
				},
                change(e) {
                    console.log(e);
                },
            }
        };
    </script>
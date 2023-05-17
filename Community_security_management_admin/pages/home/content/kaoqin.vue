<template>
	<view class="container">
	    <view class="header ui-flex-between">
	        <view>
	            <view><text class="count">{{ accumulate }}</text>天</view>
	            <view>累计打卡</view>
	        </view>
	        <view>
	            <view><text class="count">{{ continuous }}</text>天</view>
	            <view>连续打卡</view>
	        </view>
	    </view>
	    <!-- 日历卡片部分 S -->
	    <view class="calendar">
	        <view class="label ui-flex">
	            <view class="triangle left" data-type="up" bindtap="handleSwitchCalendar"></view>
	            <view>{{ date.year }}年{{ date.month }}月</view>
	            <view class="triangle right" data-type="next" bindtap="handleSwitchCalendar"></view>
	        </view>
	        <!-- 绘制周一到周天的格子：默认 42 个 -->
	        <view class="calendar-days ui-flex-wrap">
	            <view class="day-label">日</view>
	            <view class="day-label">一</view>
	            <view class="day-label">二</view>
	            <view class="day-label">三</view>
	            <view class="day-label">四</view>
	            <view class="day-label">五</view>
	            <view class="day-label">六</view>
				<view wx:for="days" wx:key="index" class="day item.class  item.active ? 'active-day' : '' " :data-date="item" bindtap="handlePunch">{{ item.date }}</view>
	            <!-- <view wx:for="{{ days }}" wx:key="index" class="day {{item.class}} {{ item.active ? 'active-day' : '' }}" data-date="{{ item }}" bindtap="handlePunch">{{ item.date }}</view> -->
	        </view>
	    </view>
	    <!-- 日历卡片部分 E -->
	</view>

</template>

<script>
	/*
	生成日历思路：
	1.得到指定月份有多少天
	2.得到月份指定天是星期几（或者理解成每个月的1号是星期几）
	*/
	
	export default{
	    data() {
			return{
				// 初始日期数组
	        dateList: [],
	        // 累计打卡
	        accumulate: 0,
	        // 连续打卡
	        continuous: 0,
	        // 日历天数
	        days: [],
	        date: {
				year:'',
				month:'',
				date:'',
				h:'',
				m:'',
				s:'',
				whichDay:''
			},
			idnum:''
			}
	    },
		methods:{
			onLoad() {
			    let date = this.getDate(Date())
				let user = wx.getStorageSync('user')
				let idnum = user.idnum
			    let days= this.initCalendar(date)
				console.log(date)
				console.log(days)
				wx.cloud.database().collection('daka').where({
					idnum:idnum.value
				 }).get({
					 success(res){
						 console.log("获取数据成功", res)
						 let array = res.data
						 var a=[];
						 var n = 0;
						 // this.dateList = array
						 for(const i of array){
							 // this.a[n] = i.time
							 a.push(i.time)
							 n+=1
							 // console.log(dateList)
						 }
						 this.dateList = a
						 console.log(this.dateList)
					 }
				 })
				 // console.log(this.dateList)
			},
			/**
			 * 初始化日历【核心方法】
			 * @param {Date} date 日期参数
			 */
			initCalendar(yearMonth) {
			    let days = []; // 用于保存最后生成的日历
			    // 得到参数 date 的1号是星期几
			    let firstDayOfWeek = this.getDayOfWeek(yearMonth.year, yearMonth.month, 1)
			    console.log(firstDayOfWeek);
			    // 得到当前月的天数
			    let toMonthDays = this.getMonthDays(yearMonth.year, yearMonth.month)
				
			    // 处理上月的年月日 以及 格子数
			    if (firstDayOfWeek > 0) {
			        let y = yearMonth.year
			        let m = yearMonth.month
			        if (m == 1) {
			            y -= 1
			            m = 12
			        } else {
			            m--
			        }
				
			        let upMonthDays = this.getMonthDays(y, m) // 得到上个月的天数
			        for (let i = 0; i < firstDayOfWeek; i++) {
			            days.push({
			                ...this.createDayOption({
			                    year: y,
			                    month: m
			                }, upMonthDays--),
			                class: 'not-current-month'
			            })
			        }
			        days.reverse()
			    }
				
			    // 处理当前月的格子数
			    for (let i = 1; i <= toMonthDays; i++) {
			        days.push(this.createDayOption(yearMonth, i))
			    }
				
			    // 处理下个月的年月以及格子数
			    let d = 42 - days.length
			    let ny = yearMonth.year
			    let nm = yearMonth.month
				
			    if (nm == 12) {
			        ny += 1
			        nm = 1
			    } else {
			        nm++
			    }
			    for (let i = 1; i <= d; i++) {
			        days.push({
			            ...this.createDayOption({
			                year: ny,
			                month: nm
			            }, i),
			            class: 'not-current-month'
			        })
			    }
			    return days
			},
			// 切换日历
			handleSwitchCalendar(e) {
			    let type = e.currentTarget.dataset.type;
			    if (type == 'up') {
					// this.data.date.month == 1
			        if (this.date.month == 1) {
						// let y = this.data.date.year
			            let y = this.date.year
			            this.setData({
			                ['date.month']: 12,
			                ['date.year']: y -= 1
			            })
			        } else {
						// let m = this.data.date.month
			            let m = this.date.month
			            this.setData({
			                ['date.month']: m -= 1
			            })
			        }
			    } else {
					// this.data.date.month == 12
			        if (this.date.month == 12) {
						// let y = this.data.date.year
			            let y = this.date.year
			            this.setData({
			                ['date.month']: 1,
			                ['date.year']: y += 1
			            })
			        } else {
						// let m = this.data.date.month
			            let m = this.date.month
			            this.setData({
			                ['date.month']: m += 1
			            })
			        }
					console.log('当前年月',date.month,date.year)
			    }
			    this.setData({
					// this.data.date
			        days: this.initCalendar(this.date),
			    })
			    this.updateDays()
			},
			// 处理打卡
			handlePunch(e) {
			    let date = e.currentTarget.dataset.date
			    console.log(date);
			    let toDay = this.getDate()
			    if (date.year <= toDay.year && date.month <= toDay.month) {
			        if (date.active) return
			        // let arr = this.data.dateList
					let arr = this.dateList
			        arr.push(date)
			        this.setData({
			            dateList: arr
			        })
			        this.updateDays()
			    } else {
			        wx.showToast({
			            icon: 'none',
			            title: '日期超过了',
			        })
			    }
			    this.handlePunchDays()
			},
			// 更新 days 状态
			updateDays() {
				// let days = this.data.days
			    let days = this.days
			    days.forEach(n => {
			        // n.active = this.data.dateList.some(s => n.year == s.year && n.month == s.month && n.date == s.date)
					n.active = this.dateList.some(s => n.year == s.year && n.month == s.month && n.date == s.date)
			    })
			    this.setData({
			        days
			    })
			},
			// 处理累计打卡和连续打卡
			handlePunchDays() {
			    // 累计打卡
			    // 就是 dateList 的长度
			    this.setData({
			        // accumulate: this.data.dateList.length
					accumulate: this.dateList.length
			    })
				
			    // 连续打卡
			    let _count = 0;
			    // let arr = this.data.dateList
				let arr = this.dateList
			    // 再实际数据中，dateList 是不需要咱们手动排序的，我这边主要是用于测试，所以一些校验并未完善
			    arr = arr.sort((a,b)=>{
			        return Date.parse(`${a.year}-${a.month}-${a.date}`) - Date.parse(`${b.year}-${b.month}-${b.date}`)
			    })
			    console.log(arr);
			    for (let i = 0; i < arr.length; i++) {
			        //把时间转换为时间戳
			        if (i != 0) {
			            let newDate_ = Date.parse(`${arr[i].year}-${arr[i].month}-${arr[i].date}`); //当天
			            let theOriginalTime_ = Date.parse(`${arr[i-1].year}-${arr[i-1].month}-${arr[i-1].date}`); //前一天
			            //计算天
			            let _day = parseInt(newDate_ - theOriginalTime_) / (1000 * 60 * 60);
			            if (_day <= 24) {
			                _count += 1;
			            } else {
			                _count = 0;
			            }
			        }
			    }
			    this.setData({
			        continuous:_count != 0 ? _count + 1 : 0,
			    })
			},
			// 1.得到指定月份有多少天
			getMonthDays(year, month) {
			    return new Date(year, month, 0).getDate()
			},
			// 2.得到月份指定天是星期几
			getDayOfWeek(year, month, date) {
			    // Date.UTC返回从1970的毫秒数
			    return new Date(Date.UTC(year, month - 1, date)).getDay()
			},
			// 生成每一天日期参数
			createDayOption(ym, d) {
			    return {
			        year: ym.year,
			        month: ym.month,
			        date: d
			    }
			},
			// 返回指定年月日
			getDate(time) {
			    let caledar = time ? new Date(time) : new Date()
			    let year = caledar.getFullYear()
			    let month = caledar.getMonth() + 1
			    let date = caledar.getDate()
			    let h = caledar.getHours()
			    let m = caledar.getMinutes()
			    let s = caledar.getSeconds()
			    let whichDay = caledar.getDay()
			    return {
			        year,
			        month,
			        date,
			        h,
			        m,
			        s,
			        whichDay
			    }
			}
		}
	}

</script>

<style>
	page{
	    height: 100%;
	}
	.ui-flex-between{
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.ui-flex{
	    display: flex;
	    justify-content: flex-start;
	    align-items: center;
	}
	.ui-flex-wrap{
	    display: flex;
	    flex-wrap: wrap;
	}
	.container{
	    width: 100%;
	    height: 100%;
	    background-image: url('https://i.loli.net/2019/10/18/C9cPfSnrMUmqxz8.png');
	    background-size: 100%;
	}
	
	.header,.calendar{
	    width: 90%;
	    margin: 0 auto;
	}
	.header{
	    padding: 50rpx 70rpx;
	    color: #fff;
	    text-align: center;
	    line-height: 60rpx;
	    font-size: 30rpx;
	    box-sizing: border-box;
	}
	.header .count{
	    font-size: 50rpx;
	    margin-right: 4rpx;
	}
	.calendar{
	    background-color: #fff;
	    border-radius: 30rpx;
	    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
	    font-size: 24rpx;
	}
	
	.label{
	    justify-content: center;
	    padding: 30rpx 0;
	}
	.triangle{
	    border-left: 20rpx solid transparent;
	    border-right: 20rpx solid transparent;
	    border-bottom: 30rpx solid #2681ff;
	}
	.label > .left,.right{
	    margin: 0 20rpx;
	}
	.label > .left{
	    transform: rotate(-90deg);
	}
	.label > .right{
	    transform: rotate(90deg);
	}
	
	/* 格子部分css */
	.calendar-days > view{
	    width: calc(100% / 7);
	    text-align: center;
	}
	.calendar-days > .day{   
	    padding: 30rpx 0;
	    color: #444;
	}
	.not-current-month{
	    color: #ccc !important;
	}
	.active-day{
	    background-color: #2681ff;
	    border-radius: 50%;
	    color: #fff !important;
	}

</style>
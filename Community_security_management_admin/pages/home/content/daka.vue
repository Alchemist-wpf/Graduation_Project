<template>
	<view>
		<uni-list v-for="(item,index) in list" :key="index">
		    <uni-list-item :title="'轮播图:'+item.name" :thumb="item.id"></uni-list-item>
			<button class="button" @click="del(index)">删除</button>
			<button class="button" type="primary" @click="uploadPhoto(index)" >上传图片</button>
		</uni-list>
		<!-- <htz-image-upload  :max="3"  v-model="ceshiData" :uploadSuccess="zidingyiSuccess" action="http://XXX"></htz-image-upload> -->
	</view>
</template>

<script>
	// import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	// export default {
	//         data() {
	//             return {
	//                 ceshiData: []
	//             }
	//         },
	//         components: {
	//             htzImageUpload,
	//         },
	//     }
	export default{
		data(){
			return{
				list:[],
				name:'',
				id:'',
				fileID:'',
				cloud_path:''
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
			uploadPhoto(index){
				this.cloud_path = "photo/"+Date.now()+".jpg"
				let list = this.list
			    wx.chooseImage({
			      count:1,
			      sizeType:'compressed',
			      sourceType:['album', 'camera'],
			      success:res=>{
			        // console.log(res.tempFilePaths[0])
			        var photoTempPath = res.tempFilePaths[0]
			        this.uploadPhotoToDatabase(photoTempPath)
					wx.cloud.database().collection('lunbotu').where({
						name:list[index].name
						}).update({
							data:{
								fileID:'cloud://management-uniapp-0eewk80b3d6e85.6d61-management-uniapp-0eewk80b3d6e85-1317314900/'+this.cloud_path
							}
						})
			      }
			    })
				},
			  uploadPhotoToDatabase(photoTempPath) {
			      wx.showLoading({
			        title:"正在上传......"
			      })
			      wx.cloud.uploadFile({
			        cloudPath:this.cloud_path,
			        filePath:photoTempPath,
			        success(res) {
			          console.log(res)
			          wx.hideLoading()
			          wx.showToast({
			            title:"上传成功！",
			            duration:2000
			          })
			        },
			        fail(res) {
			          console.log(res)
			          wx.hideLoading()
			          wx.showToast({
			            title:"上传失败，请检查网络！",
			            icon:"none",
			            duration:2000
			          })
			        },
			      })
			},
			del(index){
				let list = this.list
				console.log('删除',list[index].id)
				wx.cloud.deleteFile({
				    fileList:[list[index].id]
				    }).then(res => {
				      // handle success
				      console.log("删除成功")
				    }).catch(error => {
				      // handle error
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
		font-size: 30rpx;
	}
</style>
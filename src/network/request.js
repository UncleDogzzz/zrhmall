import axios from 'axios'
export function request(config){
  //创建axiois实例
  const instance=axios.create({
  // baseURL:'http://123.207.32.32:8000',
  baseURL: "http://152.136.185.210:8000/api/w6",
  timeout:5000
  })

  //设置拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err)
  })

 instance.interceptors.response.use(res=>{
   return res.data
 },err=>{
   console.log(err)
 })


  //返回实例

  return instance(config)
}

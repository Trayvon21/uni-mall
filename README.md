# uni-mall 基于uni-app的三平台商城项目
由于需要`axios@0.19.0`的支持，所以请使用`npm i`安装依赖
> 适配的平台有`微信小程序`、`H5`、`APP`(IOS端未验证)

## 项目结构

- 首页
  - 搜索
  - 工厂详情
  - 分类导航
  - 商品排行
- 专题
  - 专题详情
- 分类
- 购物车
  - 购买列表
- 我的
  - 收藏
  - 地址列表管理
    - 地址新增/修改
  - 意见反馈
- 商品详情

## 关键点

1. 高度自适应
   `uni.getSystemInfo`与`uni.createSelectorQuery`搭配使用，使各个分辨率的手机都能够生成自适应的`scroll-view`滚动栏，已达到多机型适配的效果；
2. `uni-switch`无法传参，可设置全局变量或者vuex等方式进行传参，实现导航列表的id传递；
3. 利用`ref`进行组件间的传值，方便导航页的导航栏与详情栏的内容匹配；
4. 定位方面（三个平台的）
   - 小程序定位
     直接利用`uni.authorize`获取权限并打开位置定位服务，再利用`uni.getLocation`就能获取到当前的经纬度，只需要使用腾讯地图sdk就能获取当前位置的详细地址。

     ```js
     // manifest.json中需要开启permission权限
     "permission": {
         "scope.userLocation": {
             "desc": "获取你的位置信息...."
            }
        }
     ```

   - H5定位，同小程序，但是获取详细地址时存在跨域的问题(目前未解决)
   - APP定位，引入第三方库[App权限判断和提示](https://ext.dcloud.net.cn/plugin?id=594)，获取手机权限和位置服务信息，再利用`uni.getLocation`获取经纬度，后面的方法同小程序

5. 富文本解析uParser的使用
   富文本中没有`http`等协议头的H5端会自动识别，但是app与小程序端无法识别，需要手动将协议头添加上去，可利用正则的方法

   ```js
   const reReg = new RegExp('//', 'g');
   const reStr = `http://`
   content = content.replace(reReg, reStr);
   ```

6. axios封装
   为便于整理接口，可引入能在uni-app上使用的封装好的axios，建立接口文档方便管理。

import service from "./index.js";
import key from '../config/index.js'

export default {
	/**
	 * get 首页数据
	 */
	getIndex() {
		return service.get(`index/index`);
	},

	/**
	 * get 专题数据
	 * @param {*} page 请求页数
	 */
	getTopic(page) {
		return service.get(`topic/listaction?page=${page}`);
	},

	/**
	 * get 分类列表
	 */
	getCategoryList() {
		return service.get(`category/indexaction`);
	},

	/**
	 * get 当前分类
	 * @param {*} id 分类id
	 */
	getCurrentCategory(id) {
		return service.get(`category/currentaction?id=${id}`);
	},

	/**
	 * get 当前分类的导航
	 * @param {*} id 分类导航id
	 */
	getCategoryNav(id) {
		return service.get(`category/categoryNav?id=${id}`);
	},
	// 6.分类导航商品列表(get): goods/goodsList?categoryId= 参数id:
	/**
	 * get 分类导航商品列表
	 * @param {*} id 分类导航id
	 */
	getNavShopList(id) {

		return service.get(`goods/goodsList?categoryId=${id}`);
	},

	/**
	 * get 搜索相关
	 * @param {*} openId 生成的openId
	 * @desc 默认关键字 搜索记录 热门搜索
	 */
	searchAbout() {
		const openId = uni.getStorageSync('user').openId
		return service.get(`search/indexaction?openId=${openId}`);
	},

	/**
	 * post 添加搜索历史
	 * @param {*} keyword 关键字
	 * @param {*} openId 生成的openId
	 */
	addHistory(keyword) {
		const openId = uni.getStorageSync('user').openId
		return service.post(`search/addhistoryaction`, {
			keyword,
			openId
		});
	},

	/**
	 * post 清空搜索记录
	 * @param {*} openId 生成的openId
	 */
	clearHistory() {
		const openId = uni.getStorageSync('user').openId
		return service.post(`search/clearhistoryAction`, {
			openId
		});
	},

	/**
	 * get 关键字搜索
	 * @param {*} keyword 关键字
	 */
	searchKeyword(keyword) {
		return service.get(`search/helperaction?keyword=${keyword}`);
	},

	/**
	 * get 首页制造商详情
	 * @param {*} id 制造商id
	 */
	getBrandDetail(id) {
		return service.get(`brand/detailaction?id=${id}`);
	},

	/**
	 * 商品列表
	 * @param {*} type 商品列表类型(hot/new)
	 * @param {*} sort 列表排列顺序(up/down)
	 */
	getGoodsList(type, sort) {
		return service.get(
			`goods/goodsList?${type === "hot" ? "isHot" : "isNew"}=1${
        sort === "up" ? "&order=asc" : sort === "down" ? "&order=desc" : ""
      }`
		);
	},

	/**
	 * get 商品详情
	 * @param {*} id 商品id
	 * @param {*} openId 生成的openId
	 */
	getDetail(id) {
		const openId = uni.getStorageSync('user').openId
		return service.get(`goods/detailaction?id=${id}&openId=${openId}`);
	},

	/**
	 * get 专题详情
	 * @param {*} id 专题id
	 */
	getTopicDetail(id) {
		return service.get(`topic/detailaction?id=${id}`);
	},

	/**
	 * post 加入收藏,商品详情接口会返回是否收藏
	 * @param {*} goodsId 商品id
	 * @param {*} openId 生成的openId
	 */
	addCollect(goodsId) {
		const openId = uni.getStorageSync('user').openId
		return service.post(`collect/addcollect?openId=${openId}`, {
			goodsId,
			openId
		});
	},

	/**
	 * get 查看收藏
	 * @param {*} openId 生成的openId
	 */
	getCollect() {
		const openId = uni.getStorageSync('user').openId
		return service.get(`collect/listAction?openId=${openId}`);
	},

	/**
	 * post 立即购买
	 * @param {*} allPrise 总价
	 * @param {*} goodsId 商品id
	 * @param {*} openId 生成的openId
	 */
	payNow(allPrise, goodsId) {
		const openId = uni.getStorageSync('user').openId
		return service.post(`order/submitAction?openId=${openId}`, {
			allPrise,
			goodsId,
			openId
		});
	},

	/**
	 * get 购买详情
	 * @param {*} addressId 地址id
	 * @param {*} openId 生成的openId
	 */
	payList(addressId) {
		const openId = uni.getStorageSync('user').openId
		return service.get(
			`order/detailAction?openId=${openId}&addressId=${addressId}`
		);
	},

	/**
	 *post 地址新增/修改
	 * @param {*} address 省市区
	 * @param {*} addressId 新增为空/修改为当前地址id
	 * @param {*} checked 是否默认
	 * @param {*} detailadress 地址详情
	 * @param {*} telNumber 电话
	 * @param {*} userName 姓名
	 * @param {*} openId 生成的openId
	 */
	saveAddress({
		address,
		addressId = "",
		checked,
		detailadress,
		telNumber,
		userName
	}) {
		const openId = uni.getStorageSync('user').openId
		return service.post(`address/saveAction`, {
			address,
			addressId,
			checked,
			detailadress,
			openId,
			telNumber,
			userName
		});
	},

	/**
	 * get 获取全部地址
	 * @param {*} openId 生成的openId
	 */
	getAddressList() {
		const openId = uni.getStorageSync('user').openId
		return service.get(`address/getListAction?openId=${openId}`);
	},

	/**
	 * get 单个地址详情
	 * @param {*} id 地址id
	 */
	getAddress(id) {
		return service.get(`address/detailAction?id=${id}`);
	},

	/**
	 * post 加入购物车
	 * @param {*} goodsId 商品id
	 * @param {*} number 数量
	 * @param {*} openId 生成的openId
	 */
	addCart(goodsId, number) {
		const openId = uni.getStorageSync('user').openId
		return service.post(`cart/addCart`, {
			goodsId,
			number,
			openId
		});
	},

	/**
	 * get 查看购物车
	 * @param {*} openId 生成的openId
	 */
	getCartList() {
		const openId = uni.getStorageSync('user').openId
		return service.get(`cart/cartList?openId=${openId}`);
	},

	/**
	 * get 删除购物车
	 * @param {*} id 商品id
	 */
	delCart(id) {
		return service.get(`cart/deleteAction?id=${id}`);
	},

	getLocation(location) {
		return service.get(
			`https://apis.map.qq.com/ws/geocoder/v1/?location=${location}&key=${key}&get_poi=1`
		)
	},
	getLocationH5(location) {
		return service.get(
			`ws/geocoder/v1/?location=${location}&key=${key}&get_poi=1`
		)
	}
};

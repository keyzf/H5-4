/*
 * @Author: LeeRay
 * @Date: 2018-03-03 13:12:59
 * @Last Modified by: lilei
 * @Last Modified time: 2020-01-10 17:20:19
 */

// 常用工具函数整理

/**
 * @desc 获取url参数
 * @param {String} name
 * @returns {String}
 */
export const getQueryString = name => {
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
	const r = window.location.search.substr(1).match(reg)
	if (r !== null) return decodeURIComponent(r[2])
	return null
}

/**
 * @desc min - max 之间的整数
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const rnd = (min, max) => {
	return Math.floor(Math.random() * (max - min)  + min)
}

/**
 * @desc 补零
 * @param {Number} n
 * @returns {String}
 */
export const toDub = n => {
	// return ('0' + n).slice(-2)
	return n < 10 ? '0' + n : '' + n
}

/**
 * @desc 是否是undefined
 * @param {*} v
 * @returns {Boolean}
 */
export const isUndef = (v) => {
	return v === undefined || v === null
}

/**
 * @desc 是否是对象
 * @param {*} v
 * @returns {Boolean}
 */
export const isObject = (v) => {
	return v !== null && typeof v === 'object'
}

export const _toString = Object.prototype.toString

/**
 * @desc 是否是普通对象
 * @param {*} obj
 * @returns {Boolean}
 */
export const isPlainObject = (obj) => {
	return _toString.call(obj) === '[object Object]'
}

/**
 * @desc 是否是正则表达式
 * @param {*} v
 * @returns {Boolean}
 */
export const isRegExp = (v) => {
	return _toString.call(v) === '[object RegExp]'
}

/**
 * @desc 金钱格式化
 * @param {Number} n
 * @returns {String}
 */
export const cashFmt = n => {
	return n.toLocaleString()
}

/**
 * @desc 日期格式化
 * @param {String|Number} ts
 * @param {String} fmt
 * @returns {String}
 */
export const tsFmt = (ts = Date.now(), fmt = 'YYYY-MM-DD HH:mm:ss') => {
	const oD = new Date(ts)

	const YY = oD.getFullYear()
	const MM = oD.getMonth() + 1
	const DD = oD.getDate()
	const HH = oD.getHours()
	const mm = oD.getMinutes()
	const ss = oD.getSeconds()
	const ms = oD.getMilliseconds()

	return fmt
		.replace('YYYY', YY)
		.replace('MM', toDub(MM))
		.replace('DD', toDub(DD))
		.replace('HH', toDub(HH))
		.replace('mm', toDub(mm))
		.replace('ss', toDub(ss))
		.replace('ms', toDub(ms))
}


/**
 * @desc 获取样式
 * @param {HTMLElement} ele
 * @param {String} name
 * @returns {String}
 */
export const getStyle = (ele, name) => {
	return (ele.currentStyle || getComputedStyle(ele, false))[name]
}

/**
 * @desc 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} iDay
 */
export const setCookie = (name, value, iDay) => {
	const oDate = new Date()
	oDate.setDate(oDate.getDate() + iDay)
	document.cookie = iDay ? `${name}=${value}; expires=${oDate}` : `${name}=${value}`
}

/**
 * @desc 获取cookie
 * @param {String} name
 * @returns {String}
 */
export const getCookie = name => {
	const arr = document.cookie.split('; ')
	for (let i = 0; i < arr.length; i++) {
		const aTmp = arr[i].split('=')
		if (aTmp[0] === name) {
			return decodeURIComponent(aTmp[1])
		}
	}
	return undefined
}

/**
 * @desc 删除cookie
 * @param {String} name
 */
export const removeCookie = name => {
	setCookie(name, '', -1)
}

/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @returns {Boolean}
 */
export const hasClass = (ele, cls) => {
	if (ele.classList) {
		return ele.classList.contains(cls)
	} else {
		const reg = new RegExp('\\b' + cls + '\\b')
		return reg.test(ele.className)
	}
}

/**
 * @desc 给元素增加class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const addClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.add(cls)
	} else {
		if (!hasClass(ele, cls)) {
			ele.className += ' ' + cls
		}
	}
}

/**
 * @desc 删除元素某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const removeClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.remove(cls)
	} else {
		if (hasClass(ele, cls)) {
			const reg = new RegExp('\\b' + cls + '\\b')
			ele.className = ele.className
				.replace(reg, '')
				.replace(/^\s+|\s+$/g, '')
				.replace(/\s+/g, ' ')
		}
	}
}

/**
 * @desc 切换class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const toggleClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.toggle(cls)
	} else {
		hasClass(ele, cls) ? removeClass(ele, cls) : addClass(ele, cls)
	}
}

/**
 * @desc 函数防抖
 * 就相当于手压住弹簧，手不松，弹簧就不会动。
 * @param {Function} cb
 * @param {Number} delay
 * @returns {Function}
 */
export const debounce = (cb, delay = 300) => {
	let timer
	return function(...args) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			cb && cb.apply(this, args)
		}, delay)
	}
}

/**
 * @desc 函数节流
 * 就相当于拧紧水龙头让它一滴一滴的流
 * @param {Function} cb
 * @param {Number} delay
 * @returns {Function}
 */
export const throttle = (cb, delay = 300) => {
	let previous = 0
	return function(...args) {
		const now = Date.now()
		if (now - previous > delay) {
			cb && cb.apply(this, args)
			previous = now
		}
	}
}

/**
 * @desc requestAnimation polyfill
 */
export const requestAnimationFrame = (() => {
	return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(cb) {
    	return setTimeout(cb, 16)
    }
})()

export const cancelAnimationFrame = (() => {
	return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function(id){
    	return clearTimeout(id)
    }
})()

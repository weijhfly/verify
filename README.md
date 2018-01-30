# verify [![npm](https://img.shields.io/npm/v/form-verify.svg)](https://www.npmjs.com/package/form-verify) [![npm](https://img.shields.io/npm/dm/form-verify.svg)](https://www.npmjs.com/package/form-verify)
> 统一的表单验证解决方案
# Install
```js
$ npm install --save form-verify
```
# Usage
```js
var verify = require('form-verify');

verify.js不干预dom和样式，不提供默认提示，只做纯校验过程。
使用方式：
传入配置对象
var v = verify({
		type:'single',//multi
		trim:false,//可选
		data:vue//可选 vue/angular等
	},
	[
	{
		value:val,
		isEmpty:'用户名不能为空',
		minLength:'密码长度不小于6位&6',
		maxLength:'密码长度最大12位&12',
		length:'密码长度在6-12位&6-12',
		isMobile:'手机号不正确',
		custom:['&==2','错误-不等于2']
	}
	]);
返回：
'single' -- 返回验证结果及单条错误信息。
'multi' --  返回验证结果及多条错误信息，并设置dom。
'data:vue/angular' --  返回验证结果及错误信息，并设置model。

```
## Update
### 2018.1.30(publish)

> * 发布至github及npm(form-verify)
> * 支持单条和多条错误提示，并设置dom
> * 支持vue/angular等配合使用

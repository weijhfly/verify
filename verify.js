/*!
 * verify.js v1.0.0
 * By weijianhua  https://github.com/weijhfly/verify
 * Time:2018/1/30
*/
;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(function(){return factory;});
	}else if (typeof exports === "object") {
		module.exports = factory;
	}else {
		window.verify = factory;
	}
}(function(config,list){

	if(!config || !list){
		return false;
	}
	
	var rules = {
		isEmpty:function(value){
			return value == '';
		},
		minLength:function(value,length){
			return value.length >= length;
		},
		maxLength:function(value,length){
			return value.length <= length;
		},
		length:function(value,min,max){
			return value.length >= min && value.length <= max;
		},
		isMobile:function(value,reg){
			//由于号段的增加，暂时使用宽泛的验证，或者自定义
			var regular = reg || /(^1[3-9][0-9]{9}$)/;
			return regular.test(value);
		},
		custom:function(value,rule){
			return rule.test(value);
		}
	}
	
	var isSingle = config.type == 'single',
		arr = [],
		result = {check:true},
		lens = list.length,
		i = 0,
		isTrim = config.type != false,
		doc = window.document,
		error = false;

	for(i=0;i<lens;i++){
		var l = list[i];
			val = l.value;
			
		if(isTrim && l.trim != false && typeof val == 'string'){
			val = val.trim();
		}

		if(l.isEmpty && rules.isEmpty(val)){
			arr[i] = l.isEmpty;
			if(isSingle){
				break;
			}else{
				setError();
				continue;
			}
		}
		if(l.minLength){
			var index = l.minLength.lastIndexOf('&'),
				msg = l.minLength.substring(0,index),
				len = l.minLength.substring(index+1);
				
			if(!rules.minLength(val,len)){
				arr[i] = msg;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}
		}
		if(l.maxLength){
			var index = l.maxLength.lastIndexOf('&'),
				msg = l.maxLength.substring(0,index),
				len = l.maxLength.substring(index+1);
				
			if(!rules.maxLength(val,len)){
				arr[i] = msg;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}
		}
		if(l.length){
			var index = l.length.lastIndexOf('&'),
				msg = l.length.substring(0,index),
				len = l.length.substring(index+1),
				min = len.match(/^\d+/),
				max = len.match(/\d+$/);
				
			if(!rules.length(val,min,max)){
				arr[i] = msg;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}
		}
		if(l.isMobile){
			if(typeof l.isMobile == 'string' && !rules.isMobile(val)){
				arr[i] = l.isMobile;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}else if(typeof l.isMobile == 'object'){
				var rule = l.isMobile[0],
					msg = l.isMobile[1];
				if(!rules.isMobile(val,rule)){
					arr[i] = msg;
					if(isSingle){
						break;
					}else{
						setError();
						continue;
					}
				}
			}
		}
		if(l.custom){
			var rule = l.custom[0],
				msg = l.custom[1];
				
			if(typeof rule  == 'string'){
				if(!eval(rule.replace(/&/g,"'"+val+"'"))){
					arr[i] = msg;
					if(isSingle){
						break;
					}else{
						setError();
						continue;
					}
				}
			}else if(typeof rule  == 'object' && !rules.custom(val,rule)){
				arr[i] = msg;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}else if(typeof rule  == 'boolean' && !rule){
				arr[i] = msg;
				if(isSingle){
					break;
				}else{
					setError();
					continue;
				}
			}
		}
		
	}
	function setError(){
		if(config.data){
			config.data[l.model] = arr[i];
		}else{
			if(typeof l.el == 'string'){
				doc.querySelector(l.el).innerHTML = arr[i];
			}else{
				l.el.text(arr[i]);
			}
		}
		error = true;
	}
	if(isSingle){
		if(arr.length != 0){result.check = false;}
		result.l = arr.filter(function(v){
			return v;
		})
		return result;
	}else{
		if(error){result.check = false;}
		result.l = arr;
		return result;
	}
}))
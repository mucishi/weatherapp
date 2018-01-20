// 获取所有的城市
let citys,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys = obj.data;
		for(let i in citys){
			let section = document.createElement('section');
			let citys_title = document.createElement('h1');
			citys_title.className = "citys_title";
			citys_title.innerHTML = i;
			section.appendChild(citys_title);
			let citys_list = document.createElement('ul');
			citys_list.className = "citys_list";

			for(let j in citys[i]){
				let li  = document.createElement('li');
				li.innerHTML = j;
				citys_list.appendChild(li);
				section.appendChild(citys_list);
            }

			$(".citys_box").append(section);


		}
    }
})

$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather( remote_ip_info.city);
})


function getFullWeather(nowcity){
	$(".now_city").html(nowcity);

	//获取当前城市的天气信息 
	$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:"jsonp",
		success:function(obj){
			weatherobj =  obj.data;
			 console.log(weatherobj);
			// 当前的空气质量
			$(".now_air_quality").html(weatherobj.weather.quality_level);
			// 当前的温度
			$(".now_temp_temp").html(weatherobj.weather.current_temperature);
			// 当前的天气
			$(".now_weather").html(weatherobj.weather.current_condition);
			// 当前的风力
			$(".now_wind_wind2").html(weatherobj.weather.wind_level+"级");


			// 近期两天的
			
			// 今天的温度
			
			// 今天的最高温
			$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
			// 今天的最低温
			$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
			// 今天的天气图片
			$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
            // 今天的天气情况
			$(".today_weather").html(weatherobj.weather.day_condition);
            // 明天的最高温
			$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
			// 明天的最低温
			$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
            // 明天的天气图片
            $(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
            // 明天的天气情况
			$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);

			// 未来24小时
		    let hours_array = weatherobj.weather.hourly_forecast;
		    for(let i = 0;i<hours_array.length;i++){
		    	// 创建元素并添加到页面
		

		    	let hours_list = document.createElement('li');
		        let hours_time = document.createElement('span');
		        hours_time.className = 'hours_time';

		        let hours_img = document.createElement('img');
		        hours_img.className = 'hours_img'; 

		        let hours_temp = document.createElement('span');
		        hours_temp.className = 'hours_temp';

		        hours_list.appendChild(hours_time);
		        hours_list.appendChild(hours_img); 
		        hours_list.appendChild(hours_temp); 
		
		        $(".hours_content").append(hours_list);
		        // 当下的时间
		        hours_time.innerHTML = hours_array[i].hour+":00";
                hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
                hours_temp.innerHTML = hours_array[i].temperature+"°";
            }
                // 最近的
                
            let weekend_array = weatherobj.weather.forecast_list;

            for(let i = 0;i<weekend_array.length;i++){
            	let weekend_list = document.createElement('li');

            	let weekend_data = document.createElement('span');
		        weekend_data.className = 'weekend_data';

		        let weekend_qinkuan_am = document.createElement('span');
		        weekend_qinkuan_am.className = 'weekend_qinkuan_am';

                let weekend_am_img = document.createElement('img');
		        weekend_am_img.className = 'weekend_am_img';

		        let weekend_temp_max = document.createElement('span');
		        weekend_temp_max.className = 'weekend_temp_max';

		        let weekend_temp_min = document.createElement('span');
		        weekend_temp_min.className = 'weekend_temp_min';

		        let weekend_wind = document.createElement('span');
		        weekend_wind.className = 'weekend_wind';

		        let weekend_quality = document.createElement('span');
		        weekend_quality.className = 'weekend_quality';

		        weekend_list.appendChild(weekend_data);
		        weekend_list.appendChild(weekend_qinkuan_am);
		        weekend_list.appendChild(weekend_am_img);
		        weekend_list.appendChild(weekend_temp_max);
		        weekend_list.appendChild(weekend_temp_min);
		        weekend_list.appendChild(weekend_wind);
		        weekend_list.appendChild(weekend_quality);

		        $(".weekend_content").append(weekend_list);

		        weekend_data.innerHTML = weekend_array[i].date.substring(5,7)+"/"+weekend_array[i].date.substring(8);

		        weekend_qinkuan_am.innerHTML = weekend_array[i].condition;
                weekend_am_img.setAttribute('src',"img/"+weekend_array[i].weather_icon_id+".png");
                weekend_temp_max.innerHTML = weekend_array[i].high_temperature+"°";
                weekend_temp_min.innerHTML = weekend_array[i].low_temperature+"°";
                weekend_wind.innerHTML = weekend_array[i].wind_direction;
                weekend_quality.innerHTML = weekend_array[i].wind_level+"级";
        	} 
    	}
	});
}

$(function(){
	$(".now_city").on("click",function(){
		$(".search_box").val("");
        $(".confirm").html('取消');
		$(".citys").css("display","block");

    })
    // 
    $("body").delegate(".citys_list li","click",function(){
    	let son = this.innerHTML;
    	getFullWeather(son);
    	$(".citys").css("display","none");
    })

    $("body").delegate(".citys_title","click",function(){
    	let son = this.innerHTML;
    	getFullWeather(son);
    	$(".citys").css("display","none");
    })
    
    $(".search_box").on("focus",function(){
    	$(".confirm").html('确认');
    })

    
    $(".confirm").on("click",function(){
    	if(this.innerText == "取消"){
    	$(".citys").css("display","none");
        }else if(this.innerText == "确认"){
           let text = $(".search_box").val();
           for(let i in citys){
           	    if(text == i){
           		getFullWeather(text);
           		$(".citys").css("display","none");
           		return;
            	}else{
           		    for(let j in citys[i]){
           			    if(text == j){
           				    getFullWeather(text);
           		            $(".citys").css("display","none");
           		            return;

           			}

           		}
           	}


           }
           alert("输入地区有误");
           $(".search_box").val("");
           $(".confirm").html('取消');

       }
    })
})


   



   
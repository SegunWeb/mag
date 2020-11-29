$(document).ready(function() {
	/* scroll */
	
	$("a[href^='#']").click(function(){
		var target = $(this).attr("href");
		$("html, body").animate({scrollTop: $(target).offset().top+"px"});
		return false;
	});

	/* timer */

	function update() {
		var Now = new Date(), Finish = new Date();
		Finish.setHours( 23);
		Finish.setMinutes( 59);
		Finish.setSeconds( 59);
		if( Now.getHours() === 23  &&  Now.getMinutes() === 59  &&  Now.getSeconds === 59) {
			Finish.setDate( Finish.getDate() + 1);
		}
		var sec = Math.floor( ( Finish.getTime() - Now.getTime()) / 1000);
		var hrs = Math.floor( sec / 3600);
		sec -= hrs * 3600;
		var min = Math.floor( sec / 60);
		sec -= min * 60;
		$(".timer .hours").text( pad(hrs));
		$(".timer .minutes").text( pad(min));
		$(".timer .seconds").text( pad(sec));
		setTimeout( update, 200);
	}
	function pad(s) { return ('00'+s).substr(-2) }
	update();
});

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
	if (!document.getElementsByClassName) {
		// Поддержка IE8
		var getElementsByClassName = function(node, classname) {
			var a = [];
			var re = new RegExp('(^| )'+classname+'( |$)');
			var els = node.getElementsByTagName("*");
			for(var i=0,j=els.length; i < j; i++)
				if(re.test(els[i].className))a.push(els[i]);
			return a;
		}
		var videos = getElementsByClassName(document.body,"youtube");
	} else {
		var videos = document.getElementsByClassName("youtube");
	}
	var nb_videos = videos.length;
	for (var i=0; i < nb_videos; i++) {
		// Находим постер для видео, зная ID нашего видео
		videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';
		// Размещаем над постером кнопку Play, чтобы создать эффект плеера
		var play = document.createElement("div");
		play.setAttribute("class","play");
		videos[i].appendChild(play);
		videos[i].onclick = function() {
			// Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
			var iframe = document.createElement("iframe");
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&playsinline=1";
			if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
			iframe.setAttribute("src",iframe_url);
			iframe.setAttribute("frameborder",'0');
			iframe.setAttribute("allow",'autoplay');

			// Высота и ширина iFrame будет как у элемента-родителя
			iframe.style.width  = this.style.width;
			iframe.style.height = this.style.height;
			// Заменяем начальное изображение (постер) на iFrame
			this.parentNode.replaceChild(iframe, this);
		}
	}
});

$(document).ready(function(){
	$('body').addClass('with-sale-block');

	$('.month_sale_bar-button').on('click', function(e){
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $('.orderformcdn:visible').eq(0).offset().top
		}, 1000);
	});

	$('#month_sale_bar .close-icon').on('click', function(){
		$('body').removeClass('with-sale-block');
		$(this).parent().parent().fadeOut('300');
	})
})

$("#phone").mask("+3 (999) 999-9999");

$('#btn-mail').on("click", function () {
	let name = $('#name').val().trim();
	let phone = $('#phone').val().trim();

	if(email === '' || email.length < 5) {
		$('#error').text("Ошибка данных email");
		return false
	}
	if(name === '' || name.length < 3) {
		$('#error').text("Ошибка данных имя");
		return false
	}
	if(phone === '' || phone.length < 10) {
		$('#error').text("Ошибка данных телефон");
		return false
	}
	$('#error').text('');

	$.ajax({
		url: "../form.php",
		type: 'POST',
		cache: false,
		data: {'name': name, 'email': email, "phone": phone},
		dataType: 'html',
		beforeSend: function () {
			$("#btn-mail").prop('disabled', true)
		},
		success: function (data) {
			if(!data) {
				$('#error').text('Ошибка отправки данных');
			} else {
				$('#form').trigger('reset');
				$('#subm').text('Данные отправлены');
			}
			$("#btn-mail").prop('disabled', false)
		}
	})
});
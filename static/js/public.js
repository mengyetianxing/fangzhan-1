$(function(){
	$(".headerTop .weixin").mouseenter(function(){
		$(this).children(".codeimg").stop().fadeIn(160).addClass("active");
	}).mouseleave(function(){
		$(this).children(".codeimg").stop().fadeOut(160).removeClass("active");
	})

  // 底部
  $(".footer .footerConRbot").children("a").mouseenter(function(){
    $(this).children("div").stop().fadeIn(200).addClass("active");
  }).mouseleave(function(){
    $(this).children("div").stop().fadeOut(200).removeClass("active");
  })

  //侧导航判断箭头是否显示
  $(".asideBox").children("li").each(function(){
      if($(this).find(".sonaside").length){
          $(this).addClass("down");
      }
  })
  $(".asideBox").children(".active").addClass("on");
  $(".asideBox").children(".down").click(function(){
      if($(this).hasClass("on")){
          $(this).removeClass("on");
          $(this).children(".sonaside").slideUp(300);
      }else {
          $(this).addClass("on");
          $(this).siblings("li").removeClass("on");
          $(this).children(".sonaside").slideDown(300);
          $(this).siblings(".down").children(".sonaside").slideUp(300);
      }
  })

	//提交审核
	$('body').on('click', '.btn-ajax', function () {
		var $this = $(this);
		var url = $this.data('url');
		var msg = $this.data('msg');
		layer.msg(msg, {
			time: 0 //不自动关闭
			, btn: ['确定', '取消']
			, yes: function (index) {
				layer.close(index);
				$.post(url, function (data) {
					layer.msg(data.msg, {}, function () {
						location.reload();
					});
				}, 'json');
			}
		});
	})

	layui.use(['form', 'layedit', 'laydate'], function(){
  		var form = layui.form
  		,layer = layui.layer
  		,layedit = layui.layedit
  		,laydate = layui.laydate;
  
  		//创建一个编辑器
  		var editIndex = layedit.build('LAY_demo_editor');
 
  		//自定义验证规则
  		form.verify({
    		pass: [/(.+){6,12}$/, '密码必须6到12位']
    		,content: function(value){
      			layedit.sync(editIndex);
    		},
			confirmPass:function(value){
				if($('input[name=password]').val() !== value)
					return '两次密码输入不一致！';
			}
  		});

  		form.on('select(link)', function(data){
		  	window.open(data.value);
		});
	});	
})
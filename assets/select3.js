jQuery(document).ready(function($){

    $(window).scroll(function(){
        $('.select3 .options:visible').each(function(i,o){ 
            $(o).hide();
        });           
    });
    
    $(window).click(function(e){
        var t = $(e.target);
        if($(t).parents('.select3').length > 0) {
            return;
        }
        $('.select3').find('.options').hide();
    });

    $.fn.select3 = function()
    {
		var _this = this;
		$(_this).each(function(){
			var widget = $(this);
            var hidden = widget.find("input[type=hidden]");
            var options = widget.find('.options');
            
            var activator = function()
            {
                $('.select3 .options:visible').each(function(i,o){ 
                    if($(o).attr('data-group') != options.attr('data-group'))
                        $(o).hide();
                });

                options.toggle();

                options.css({ "width" : options.parent().width() });
            };
         
            widget.find('.activator').click(activator);
        
            if('yes' == widget.find('.text').attr('data-click-behavior'))
            {
               widget.find('.text').click(activator);
            }
           
            options.css({ 'z-index' : 1000000 });

            widget.find('[type=checkbox]').change(function(){
                
                var clicked = $(this);
                
                var checkboxes = $(clicked.attr("data-group")).find("[type=checkbox]");

                var allWasClicked = ('all' == clicked.attr('data-type'));
                
                var obj = {};

                checkboxes.each(function(i, chk){
                
                    var iAmAll = ('all' == $(chk).attr('data-type'));
                    
                    var isDisabled = $(chk).is(":disabled");

                    var key = $(chk).val();
                    
                    if(allWasClicked && !iAmAll && !isDisabled)
                    {
                        $(chk).prop('checked', clicked.is(':checked'));
                    }

                    if(!iAmAll)
                    Object.defineProperty( obj , key , 
                        { value: $(chk).is(':checked'), writable: 
                            true, enumerable: true, configurable: true });

                });

                hidden.val(window.btoa(JSON.stringify(obj))); 
            });

		});
	};

    $('.select3').select3();

});

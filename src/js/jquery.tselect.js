/**
* tSelect 0.1 - A Lite jQuery plugin to customise your select inputs
* http://github.com/s43/tSelect/
* Requirements : jQuery 1.4+
* 
* :: Copyright (c) 2015 SAID ASSEMLAL
*
* Dual licensed under the MIT and GPL licenses.
*/

(function($){
    $.fn.tSelect = function(_opts){
        $('html').addClass('has-ts-select');

        var defaults = {
            placeholder: 'Select',
            filter : false,
            filterPlaceholder: 'Filter…',
            filterNoMatches: 'No matches…',
            dom : {
                wrapperClass : 'ts-wrap',
                triggerClass : 'ts-trigger',
                optionsWrapClass : 'ts-options-wrap',
                optionClass : 'ts-option',
                activeOptionClass : 'ts-active',
            },
            onOptionSelect : function(){},
            onActive : function(){}
        };

        return this.each(function(){

            // Init

            var opts = $.extend(defaults, _opts),
                select  = $(this),
                options = select.find('option'),
                placeholder = ( select.attr('data-placeholder') )? select.attr('data-placeholder') : opts.placeholder,
                wrapper        = $('<div class="' + opts.dom.wrapperClass + (select.is(':disabled') ? ' ts-disabled' : '') +'"></div>'),
                trigger    = $('<a href="#" class="' + opts.dom.triggerClass +'">' + opts.placeholder+'</a>'),
                searchFilter = $('<span class="ts-filter"><input type="text" placeholder="'+opts.filterPlaceholder+'" /></span>'),
                optionsWrap = $('<div class="' + opts.dom.optionsWrapClass +'"></div>');


            // Check if the input has been already stylised, if so then move forwards.

            if( $(this).parents('.' + opts.dom.wrapperClass).length ) {
                return;
            }

            // prepare tSelect dom elements
            var prepare = function(){
                select.hide();
                
                wrapper.insertAfter(select);

                trigger.appendTo(wrapper);

                optionsWrap.appendTo(wrapper);

                // append select options as a tags
                options.each(function(){
                    val = $(this).val(),
                    optGroup = $(this).parents('optgroup'),
                    html = $(this).html();

                    opt = $('<a />', {
                        'class' : opts.dom.activeOption,
                        'href' : '#',
                        'data-val' : val,
                        'html' : html
                    });

                    if( val == '' ) return;

                    if( optGroup.length > 0 ){
                        currGroup = $('.ts-group-'+optGroup.index());
                        if( currGroup.length < 1 ) $('<span class="ts-optgroup ts-group-'+optGroup.index()+'"><span class="ts-group-title">'+optGroup.attr('label')+'</span></span>').appendTo(optionsWrap);
                        opt.appendTo(currGroup);
                    }else{
                        opt.appendTo(optionsWrap);
                    }
                    
                });  
                
                if( opts.filter == true ){
                    searchFilter.prependTo(optionsWrap);
                    $('<span class="ts-error">'+opts.filterNoMatches+'</span>').insertAfter(searchFilter);
                }
            }

            // events
            var events = function(){

                trigger.on('click', function(e){
                    _self = $(this),
                    _elWrap = _self.parents('.ts-wrap'),
                    _optionsWrap = _self.siblings('.'+opts.dom.optionsWrapClass),
                    e.preventDefault();


                    // Hide other selects
                    $('.ts-options-wrap').hide();
                    $('.ts-wrap').removeClass('ts-active');

                    // Show & Hide options
                    if( _optionsWrap.is(':visible') ){
                        _optionsWrap.hide();
                        _elWrap.removeClass('ts-active');
                    }else{
                        _optionsWrap.show();
                        _elWrap.addClass('ts-active');
                    }

                    if( opts.filter == true ){
                        searchFilter.find('input').trigger('focus');
                    }
                    
                    opts.onActive();
                })

                optionsWrap.find('a').on('click', function(e){
                    _self = $(this),
                    _elWrap = _self.parents('.ts-wrap'),
                    _val = _self.attr('data-val');
                    e.preventDefault();
                    // take off the active class from the other options
                    optionsWrap.find('a.active').removeClass('active');
                    // activate the triggered option
                    _self.addClass('active');
                    // update select's value
                    select.val( _val ).trigger('change');
                    // take off the active state
                    _elWrap.removeClass('ts-active');

                    trigger.text(_self.html());

                    optionsWrap.hide()

                    opts.onOptionSelect();
                })


                $('html, body').on('click', function(e){
                    target = $(e.target);
                    if( target.parents('.ts-wrap').length < 1 && $('.ts-wrap.ts-active').length > 0 ){
                        $('.ts-options-wrap').hide();
                        $('.ts-wrap').removeClass('ts-active');
                    }
                });

                // Filter event ( if it's been activated )
                if( opts.filter == true ){
                  searchFilter.find('input').on('keyup', function(e){
                    var value = $(this).val(),
                        filterTags = $(this).parents('.ts-filter');

                    value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase();
                    });

                    matches = filterTags.siblings('a:contains(' + value + ')');
                    nonmatches = filterTags.siblings('a:not(:contains(' + value + '))');

                    if (value == '') {
                        filterTags.siblings('a.ts-unmatched').removeClass('ts-unmatched');
                    }
                    else {
                        nonmatches.addClass('ts-unmatched');
                        if( matches.length < 1 ){
                          optionsWrap.addClass('ts-no-matches');
                        }else{
                          optionsWrap.removeClass('ts-no-matches');
                          matches.removeClass('ts-unmatched');
                        }
                    }
                  })                    
                }
            }
            prepare();
            events();
        });
    };

})(jQuery);
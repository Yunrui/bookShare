// ------------------------------------------------------------------------------
// Helper Plugin starting from here
// $TODO: consider move those plugins to separate files but build all js together
// ------------------------------------------------------------------------------

// jQuery plugin for condition which is useful in our app.
(function($){
  $.fn.iff = function(test) {
	// I put a empty collection on stack so that the following operations don't make sense until .end() is called.
    var elems = !test ? [] : this;
    return this.pushStack(elems);
  };
  
})(jQuery);



/*!
 * jQuery blockUI plugin
 * Version 2.53 (01-NOV-2012)
 * @requires jQuery v1.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2012 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
;(function() {
"use strict";


	function setup($) {
		if (/^1\.(0|1|2)/.test($.fn.jquery)) {
			/*global alert:true */
			alert('blockUI requires jQuery v1.3 or later!  You are using v' + $.fn.jquery);
			return;
		}


		$.fn._fadeIn = $.fn.fadeIn;


		var noOp = $.noop || function() {};


		// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
		// retarded userAgent strings on Vista)
		var msie = /MSIE/.test(navigator.userAgent);
		var ie6  = /MSIE 6.0/.test(navigator.userAgent);
		var mode = document.documentMode || 0;
		// var setExpr = msie && (($.browser.version < 8 && !mode) || mode < 8);
		var setExpr = $.isFunction( document.createElement('div').style.setExpression );


		// global $ methods for blocking/unblocking the entire page
		$.blockUI   = function(opts) { install(window, opts); };
		$.unblockUI = function(opts) { remove(window, opts); };


		// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
		$.growlUI = function(title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append('<h1>'+title+'</h1>');
			if (message) $m.append('<h2>'+message+'</h2>');
			if (timeout === undefined) timeout = 3000;
			$.blockUI({
				message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
				timeout: timeout, showOverlay: false,
				onUnblock: onClose,
				css: $.blockUI.defaults.growlCSS
			});
		};


		// plugin method for blocking element content
		$.fn.block = function(opts) {
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function() {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
					return;
				$el.unblock({ fadeOut: 0 });
			});


			return this.each(function() {
				if ($.css(this,'position') == 'static')
					this.style.position = 'relative';
				this.style.zoom = 1; // force 'hasLayout' in ie
				install(this, opts);
			});
		};


		// plugin method for unblocking element content
		$.fn.unblock = function(opts) {
			return this.each(function() {
				remove(this, opts);
			});
		};


		$.blockUI.version = 2.53; // 2nd generation blocking at no extra cost!


		// override these in your code to change the default behavior and style
		$.blockUI.defaults = {
			// message displayed when blocking (use null for no message)
			message:  '<h1>Please wait...</h1>',


			title: null,		// title string; only used when theme == true
			draggable: true,	// only used when theme == true (requires jquery-ui.js to be loaded)


			theme: false, // set to true to use with jQuery UI themes


			// styles for the message when blocking; if you wish to disable
			// these and use an external stylesheet then do this in your code:
			// $.blockUI.defaults.css = {};
			css: {
				padding:	0,
				margin:		0,
				width:		'5%',
				top:		'49%',
				left:		'49%',
				textAlign:	'center',
				color:		'#000',
				border:		'3px solid #aaa',
				backgroundColor:'#fff',
				cursor:		'wait'
			},


			// minimal style set used when themes are used
			themedCSS: {
				width:	'30%',
				top:	'40%',
				left:	'35%'
			},


			// styles for the overlay
			overlayCSS:  {
				backgroundColor:	'#000',
				opacity:				0.6,
				cursor:				'wait'
			},


			// style to replace wait cursor before unblocking to correct issue
			// of lingering wait cursor
			cursorReset: 'default',


			// styles applied when using $.growlUI
			growlCSS: {
				width:		'350px',
				top:		'10px',
				left:		'',
				right:		'10px',
				border:		'none',
				padding:	'5px',
				opacity:	0.6,
				cursor:		'default',
				color:		'#fff',
				backgroundColor: '#000',
				'-webkit-border-radius':'10px',
				'-moz-border-radius':	'10px',
				'border-radius':		'10px'
			},


			// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			// (hat tip to Jorge H. N. de Vasconcelos)
			/*jshint scripturl:true */
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',


			// force usage of iframe in non-IE browsers (handy for blocking applets)
			forceIframe: false,


			// z-index for the blocking overlay
			baseZ: 1000,


			// set these to true to have the message automatically centered
			centerX: true, // <-- only effects element blocking (page block controlled via css above)
			centerY: true,


			// allow body element to be stetched in ie6; this makes blocking look better
			// on "short" pages.  disable if you wish to prevent changes to the body height
			allowBodyStretch: true,


			// enable if you want key and mouse events to be disabled for content that is blocked
			bindEvents: true,


			// be default blockUI will supress tab navigation from leaving blocking content
			// (if bindEvents is true)
			constrainTabKey: true,


			// fadeIn time in millis; set to 0 to disable fadeIn on block
			fadeIn:  200,


			// fadeOut time in millis; set to 0 to disable fadeOut on unblock
			fadeOut:  400,


			// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			timeout: 0,


			// disable if you don't want to show the overlay
			showOverlay: true,


			// if true, focus will be placed in the first available input field when
			// page blocking
			focusInput: true,


			// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			// no longer needed in 2012
			// applyPlatformOpacityRules: true,


			// callback method invoked when fadeIn has completed and blocking message is visible
			onBlock: null,


			// callback method invoked when unblocking has completed; the callback is
			// passed the element that has been unblocked (which is the window object for page
			// blocks) and the options that were passed to the unblock call:
			//	onUnblock(element, options)
			onUnblock: null,


			// callback method invoked when the overlay area is clicked.
			// setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
			onOverlayClick: null,


			// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			quirksmodeOffsetHack: 4,


			// class name of the message block
			blockMsgClass: 'blockMsg',


			// if it is already blocked, then ignore it (don't unblock and reblock)
			ignoreIfBlocked: false
		};


		// private data and functions follow...


		var pageBlock = null;
		var pageBlockEls = [];


		function install(el, opts) {
			var css, themedCSS;
			var full = (el == window);
			var msg = (opts && opts.message !== undefined ? opts.message : undefined);
			opts = $.extend({}, $.blockUI.defaults, opts || {});


			if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
				return;


			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			if (opts.onOverlayClick)
				opts.overlayCSS.cursor = 'pointer';


			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;


			// remove the current block (if there is one)
			if (full && pageBlock)
				remove(window, {fadeOut:0});


			// if an existing element is being used as the blocking content then we capture
			// its current place in the DOM (and current display style) so we can restore
			// it when we unblock
			if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data('blockUI.history', data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent)
					data.parent.removeChild(node);
			}


			$(el).data('blockUI.onUnblock', opts.onUnblock);
			var z = opts.baseZ;


			// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
			// layer1 is the iframe layer which is used to supress bleed through of underlying content
			// layer2 is the overlay layer which has opacity and a wait cursor (by default)
			// layer3 is the message content that is displayed while blocking
			var lyr1, lyr2, lyr3, s;
			if (msie || opts.forceIframe)
				lyr1 = $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>');
			else
				lyr1 = $('<div class="blockUI" style="display:none"></div>');


			if (opts.theme)
				lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+ (z++) +';display:none"></div>');
			else
				lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');


			if (opts.theme && full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">';
				if ( opts.title ) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>';
				}
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (opts.theme) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">';
				if ( opts.title ) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>';
				}  
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';
			}
			else {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';
			}
			lyr3 = $(s);


			// if we have a message, style it
			if (msg) {
				if (opts.theme) {
					lyr3.css(themedCSS);
					lyr3.addClass('ui-widget-content');
				}
				else
					lyr3.css(css);
			}


			// style the overlay
			if (!opts.theme /*&& (!opts.applyPlatformOpacityRules)*/)
				lyr2.css(opts.overlayCSS);
			lyr2.css('position', full ? 'fixed' : 'absolute');


			// make iframe layer transparent in IE
			if (msie || opts.forceIframe)
				lyr1.css('opacity',0.0);


			//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
			var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
			$.each(layers, function() {
				this.appendTo($par);
			});


			if (opts.theme && opts.draggable && $.fn.draggable) {
				lyr3.draggable({
					handle: '.ui-dialog-titlebar',
					cancel: 'li'
				});
			}


			// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
			var expr = setExpr && (!$.support.boxModel || $('object,embed', full ? null : el).length > 0);
			if (ie6 || expr) {
				// give body 100% height
				if (full && opts.allowBodyStretch && $.support.boxModel)
					$('html,body').css('height','100%');


				// fix ie6 issue when blocked element has a border width
				if ((ie6 || !$.support.boxModel) && !full) {
					var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
					var fixT = t ? '(0 - '+t+')' : 0;
					var fixL = l ? '(0 - '+l+')' : 0;
				}


				// simulate fixed position
				$.each(layers, function(i,o) {
					var s = o[0].style;
					s.position = 'absolute';
					if (i < 2) {
						if (full)
							s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"');
						else
							s.setExpression('height','this.parentNode.offsetHeight + "px"');
						if (full)
							s.setExpression('width','jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
						else
							s.setExpression('width','this.parentNode.offsetWidth + "px"');
						if (fixL) s.setExpression('left', fixL);
						if (fixT) s.setExpression('top', fixT);
					}
					else if (opts.centerY) {
						if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
						s.marginTop = 0;
					}
					else if (!opts.centerY && full) {
						var top = (opts.css && opts.css.top) ? parseInt(opts.css.top, 10) : 0;
						var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
						s.setExpression('top',expression);
					}
				});
			}


			// show the message
			if (msg) {
				if (opts.theme)
					lyr3.find('.ui-widget-content').append(msg);
				else
					lyr3.append(msg);
				if (msg.jquery || msg.nodeType)
					$(msg).show();
			}


			if ((msie || opts.forceIframe) && opts.showOverlay)
				lyr1.show(); // opacity is zero
			if (opts.fadeIn) {
				var cb = opts.onBlock ? opts.onBlock : noOp;
				var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
				var cb2 = msg ? cb : noOp;
				if (opts.showOverlay)
					lyr2._fadeIn(opts.fadeIn, cb1);
				if (msg)
					lyr3._fadeIn(opts.fadeIn, cb2);
			}
			else {
				if (opts.showOverlay)
					lyr2.show();
				if (msg)
					lyr3.show();
				if (opts.onBlock)
					opts.onBlock();
			}


			// bind key and mouse events
			bind(1, el, opts);


			if (full) {
				pageBlock = lyr3[0];
				pageBlockEls = $(':input:enabled:visible',pageBlock);
				if (opts.focusInput)
					setTimeout(focus, 20);
			}
			else
				center(lyr3[0], opts.centerX, opts.centerY);


			if (opts.timeout) {
				// auto-unblock
				var to = setTimeout(function() {
					if (full)
						$.unblockUI(opts);
					else
						$(el).unblock(opts);
				}, opts.timeout);
				$(el).data('blockUI.timeout', to);
			}
		}


		// remove the block
		function remove(el, opts) {
			var full = (el == window);
			var $el = $(el);
			var data = $el.data('blockUI.history');
			var to = $el.data('blockUI.timeout');
			if (to) {
				clearTimeout(to);
				$el.removeData('blockUI.timeout');
			}
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			bind(0, el, opts); // unbind events


			if (opts.onUnblock === null) {
				opts.onUnblock = $el.data('blockUI.onUnblock');
				$el.removeData('blockUI.onUnblock');
			}


			var els;
			if (full) // crazy selector to handle odd field errors in ie6/7
				els = $('body').children().filter('.blockUI').add('body > .blockUI');
			else
				els = $el.find('>.blockUI');


			// fix cursor issue
			if ( opts.cursorReset ) {
				if ( els.length > 1 )
					els[1].style.cursor = opts.cursorReset;
				if ( els.length > 2 )
					els[2].style.cursor = opts.cursorReset;
			}


			if (full)
				pageBlock = pageBlockEls = null;


			if (opts.fadeOut) {
				els.fadeOut(opts.fadeOut);
				setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
			}
			else
				reset(els, data, opts, el);
		}


		// move blocking element back into the DOM where it started
		function reset(els,data,opts,el) {
			els.each(function(i,o) {
				// remove via DOM calls so we don't lose event handlers
				if (this.parentNode)
					this.parentNode.removeChild(this);
			});


			if (data && data.el) {
				data.el.style.display = data.display;
				data.el.style.position = data.position;
				if (data.parent)
					data.parent.appendChild(data.el);
				$(el).removeData('blockUI.history');
			}


			if (typeof opts.onUnblock == 'function')
				opts.onUnblock(el,opts);


			// fix issue in Safari 6 where block artifacts remain until reflow
			var body = $(document.body), w = body.width(), cssW = body[0].style.width;
			body.width(w-1).width(w);
			body[0].style.width = cssW;
		}


		// bind/unbind the handler
		function bind(b, el, opts) {
			var full = el == window, $el = $(el);


			// don't bother unbinding if there is nothing to unbind
			if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
				return;


			$el.data('blockUI.isBlocked', b);


			// don't bind events when overlay is not in use or if bindEvents is false
			if (!opts.bindEvents || (b && !opts.showOverlay))
				return;


			// bind anchors and inputs for mouse and key events
			var events = 'mousedown mouseup keydown keypress touchstart touchend touchmove';
			if (b)
				$(document).bind(events, opts, handler);
			else
				$(document).unbind(events, handler);


		// former impl...
		//		var $e = $('a,:input');
		//		b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
		}


		// event handler to suppress keyboard/mouse events when blocking
		function handler(e) {
			// allow tab navigation (conditionally)
			if (e.keyCode && e.keyCode == 9) {
				if (pageBlock && e.data.constrainTabKey) {
					var els = pageBlockEls;
					var fwd = !e.shiftKey && e.target === els[els.length-1];
					var back = e.shiftKey && e.target === els[0];
					if (fwd || back) {
						setTimeout(function(){focus(back);},10);
						return false;
					}
				}
			}
			var opts = e.data;
			var target = $(e.target);
			if (target.hasClass('blockOverlay') && opts.onOverlayClick)
				opts.onOverlayClick();


			// allow events within the message content
			if (target.parents('div.' + opts.blockMsgClass).length > 0)
				return true;


			// allow events for content that is not being blocked
			return target.parents().children().filter('div.blockUI').length === 0;
		}


		function focus(back) {
			if (!pageBlockEls)
				return;
			var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
			if (e)
				e.focus();
		}


		function center(el, x, y) {
			var p = el.parentNode, s = el.style;
			var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
			var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
			if (x) s.left = l > 0 ? (l+'px') : '0';
			if (y) s.top  = t > 0 ? (t+'px') : '0';
		}


		function sz(el, p) {
			return parseInt($.css(el,p),10)||0;
		}


	}




	/*global define:true */
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define(['jquery'], setup);
	} else {
		setup(jQuery);
	}


})();



/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {


	var pluses = /\+/g;


	function raw(s) {
		return s;
	}


	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}


	var config = $.cookie = function (key, value, options) {


		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);


			if (value === null) {
				options.expires = -1;
			}


			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}


			value = config.json ? JSON.stringify(value) : String(value);


			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}


		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}


		return null;
	};


	config.defaults = {};


	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};


})(jQuery, document);


// class.js
/**  
 *
 * @preserve Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
  var initializing = false,
    fnTest = /xyz/.test(function() {
      xyz;
    }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function() {};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
        return function() {
          var tmp = this._super;

          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = _super[name];

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      })(name, prop[name]) : prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();


// ------------------------------------------------------------------------------
// Business logic starting from here
// ------------------------------------------------------------------------------

// Not pollute global namespace
(function($) {

	var ListViewModelBase = Class.extend({
		init: function (listId) {
			this.element = $("#" + listId);
			self = this;
		},

		refreshCore: function(result) {
		},
		
		refresh: function(result) {
			this.element.find("li").remove();	
			this.refreshCore(result);
			this.element.listview('refresh');	
		},

		getData: function(url, data) {

			var self = this;
			$.getJSON(url, data,
				function(result) {
					if (result.status == 0) {
						// Cannot use "this", since this points to the caller.
						self.refresh(result.output);
					}
					else if (result.status == 2) {
						window.location = result.output;
					}
					else {
						//$TODO: do nice error popup later
						alert(result.output);
					}
				}
			).error(function(data) { 
				alert(data); 
			});
		},
	});

	var BookViewModel = ListViewModelBase.extend({		
		refreshCore: function(result) {
			this._super(result);
			
			for(var i = 0; i < result.length; i++){
				// $TODO: move all style to separate css files
				$("<li/>").append(
					$("<div/>").append(
						$("<table />")
							.append($("<tr style='vertical-align:top;'/>")
								.append($("<td />").append($("<img src='" + result[i].img + "' />")))
								.append($("<td style='padding: 12px;width:100%;height:100%;'/>")
									.append($("<div/>")
										.append($("<p>书名: " + result[i].bookName + "</p>"))
										.iff(result[i].displayName != undefined)
											.append($("<p>所有人: " + result[i].displayName + "</p>"))  
											.end()
										.append($("<p>作者: " + result[i].author + "</p>"))
										.append($("<p>页数: " + result[i].pages + "</p>"))
										.append($("<p>出版社: " + result[i].publisher + "</p>"))
										.append($("<p>价格: " + result[i].price + "</p>"))
										.append($("<p>ISBN: " + result[i].isbn + "</p>")))))
							.append($("<tr style='vertical-align:top;'/>")
								.append($("<td style='padding: 3px;width:100%;height:100%;' colspan='2'/>")
									.append($("<div style='width:100%;height:100%;'/>")
										.append($("<span style='color:orange'>内容简介 </span>"))
										.append($("<span style='font-size:12px' />").text(result[i].description)))))))
				.appendTo(this.element);
			}		
		}
	});

	var AddBookViewModel = ListViewModelBase.extend({		
		refreshCore: function(result) {
			this._super(result);
			var books = result.books;

			for(var i = 0; i < books.length; i++) {
				$("<li data-icon='plus'/>").append(
					$("<a  />").append(
						$("<table />")
							.append($("<tr style='vertical-align:top;'/>")
								.append($("<td />").append($("<img src='" + books[i].images["small"] + "' />")))
								.append($("<td style='padding: 8px;width:100%;height:100%;'/>")
									.append($("<div/>")
										.append($("<p>书名: " + books[i].title + "</p>"))
										.iff(books[i].author != undefined && books[i].author.length != undefined && books[i].author.length != 0)
											.append($("<p>作者: " + books[i].author[0] + "</p>"))  
											.end()
										.append($("<p>页数: " + books[i].pages + "</p>"))
										.append($("<p>出版社: " + books[i].publisher + "</p>"))
										.append($("<p>价格: " + books[i].price + "</p>")))))))
					// accessing i in closure directly gets the last value, so have to cache *i* immediately 
					.data("bookIndex", i)
					.click(function()
						{
							var book = books[$(this).data("bookIndex")];
							// $NOTE: Since its POST data, I guess its not necessary to do encoding
							// $TODO: NullReference check for images and author
							$.post("addBook.php", 
									{ 
										bookId:book.id, 
										bookName:book.title, 
										img:book.images.medium, 
										author:book.author[0], 
										isbn:book.isbn13, 
										pages:book.pages,  
										publisher:book.publisher,
										price:book.price,
										description:book.summary,
									}, 
									function(result) { 
										if(result.status == 0) {
											// $TODO: nicely close this dialog or clear the list since already added.
											// $TODO: When anything added successfully, we should refresh MyBook page also.
											$("#searchDoubanBookList li").remove();
											$.growlUI('操作已成功', '该图书已添加至您的书单！'); 
										}
										else if (result.status == 2) {
											window.location = result.output;
										}
										else {
											alert (result.output);
										}
									},
									"json"
							);
						})
				.appendTo(this.element);
			}	
		},

		// Override this method for Douban JSONP
		getData: function(url, data) {
			var self = this;

			$.blockUI();
			$.getJSON(url, data,
				function(result) {
					if (result) {
						self.refresh(result);
						$.unblockUI();
					}
				}
			);
		},
	});

	// NOTE: seems that not necessary to have auto-refresh for this page 
	// since people on this page completely leveraging search box which 
	// returns fresh data always.
	$(document).delegate("#searchBook", "pageinit", function() {
		var searchBookViewModel = new BookViewModel("searchBookList");
		searchBookViewModel.getData("searchBook.php", { });

		$("#search").bind("change", function(event, ui) {
			searchBookViewModel.getData("searchBook.php", { searchText: $.trim($("#search").val())});
		});
	});


	$(document).delegate("#myBook", "pageinit", function() {
		var myBookViewModel = new BookViewModel("myBookList");
		myBookViewModel.getData("myBook.php", { });
	});


	$(document).delegate("#addBook", "pageinit", function() {
		var addBookViewModel = new AddBookViewModel("searchDoubanBookList");

		$("#searchDouban").bind("change", function(event, ui) {
			var keyword = $.trim($("#searchDouban").val());
			if (keyword)
			{
				var link = "http://api.douban.com/v2/book/search?q=" + encodeURIComponent(keyword) + "&start=0&count=5&alt=xd&callback=?";
				addBookViewModel.getData(link, {});
			}
		});
	});

	// enable progress indicator for all Ajax requests, the only exception is JSONP
	var startTime;
	$(document).ajaxStart(function(){
		startTime = new Date();
   		$.blockUI();

		// All requests to BookShare service must enforce the following cookie
		// $NOTE: this code is for testing purpose.
		// var userId = $.cookie('userId'); 
		// if (userId === null) {
		//	$.cookie('userId', '1', { expires: 30 });
		// }
	})
	.ajaxStop(function() {
		var endTime = new Date();
		var interval = endTime - startTime;
		if (interval >= 500) {
			$.unblockUI();
		}
		else {
			setTimeout($.unblockUI, 500 - interval);
		}
	});

	$.blockUI.defaults.message = '<h1><img src="images/ajax-loader.gif" /></h1>';

})(jQuery);

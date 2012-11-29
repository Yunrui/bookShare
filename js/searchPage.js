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

		update: function(self, result) {
			if (result.status == 0) {
				// Cannot use "this", since this points to the caller.
				self.refresh(result.output);
			}
			else {
				//$TODO: do nice error popup later
				alert(result.output);
			}
		},

		getData: function(url, data) {
			var self = this;
			$.getJSON(url, data,
				function(result) {
					self.update(self, result);
				}
			);
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
							// $TODO: error handling
							$.post("addBook.php", 
									{ 
										userId:1,
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
											$("#searchDoubanBookList li").remove();
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

		update: function(self, result) {
			if (result) {
				self.refresh(result);
			}
		}
	});

	// NOTE: seems that not necessary to have auto-refresh for this page 
	// since people on this page completely leveraging search box which 
	// returns fresh data always.
	$(document).delegate("#searchBook", "pageinit", function() {
		var searchBookViewModel = new BookViewModel("searchBookList");
		searchBookViewModel.getData("searchBook.php", { userId: 1, });

		$("#search").bind("change", function(event, ui) {
			searchBookViewModel.getData("searchBook.php", { userId: 1, searchText: $.trim($("#search").val())});
		});
	});


	$(document).delegate("#myBook", "pageinit", function() {
		var myBookViewModel = new BookViewModel("myBookList");
		myBookViewModel.getData("myBook.php", { userId: 1, });
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
})(jQuery);



// $TODO: consider move this plugin to separate file but build all js together
// jQuery plugin for condition which is useful in our app.
(function($){
  $.fn.iff = function(test) {
	// I put a empty collection on stack so that the following operations don't make sense until .end() is called.
    var elems = !test ? [] : this;
    return this.pushStack(elems);
  };
  
})(jQuery);


// Not pollute global namespace
(function($) {
	$(document).delegate("#searchBook", "pageinit", function() {
	
		//$TODO: switch to getJSON? 
		$.ajax({
					url: "searchBook.php?userId=1", 
					dataType: "json",
					success: function(result){
						refreshSearchBookListView(result, "#searchBookList");
		    		},
					error: function(jqXHR, textStatus, errorThrown){
						alert(jqXHR + textStatus + errorThrown);
					},
		});

		$("#search").bind("change", function(event, ui) {
			$.ajax({
						url: "searchBook.php?userId=1&searchText=" + $("#search").val(), 
						dataType: "json",
						success: function(result){
							refreshSearchBookListView(result, "#searchBookList");
						},
						error: function(jqXHR, textStatus, errorThrown){
							alert(jqXHR + textStatus + errorThrown);
						},
			});
		});
	});


	$(document).delegate("#myBook", "pageinit", function() {
	
		//$TODO: switch to getJSON? 
		$.ajax({
					url: "myBook.php?userId=1", 
					dataType: "json",
					success: function(result){
						refreshSearchBookListView(result, "#myBookList");
		    		},
					error: function(jqXHR, textStatus, errorThrown){
						alert(jqXHR + textStatus + errorThrown);
					},
		});

	});


	$(document).delegate("#addBook", "pageinit", function() {

		$("#searchDouban").bind("change", function(event, ui) {
			// $TODO: trim input later
			var keyword = $("#searchDouban").val();
			if (keyword)
			{
				var link = "http://api.douban.com/v2/book/search?q=" + encodeURIComponent($("#searchDouban").val()) + "&start=0&count=5&alt=xd&callback=?";
				$.getJSON(link, function(result){
					var books = result.books;
					$("#searchDoubanBookList li").remove();

					for(var i = 0; i < books.length; i++) {
						$("<li data-icon='plus'/>").append(
							$("<a  />").append(
								$("<table />")
									.append($("<tr style='vertical-align:top;'/>")
										.append($("<td />").append($("<img src='" + books[i].images["small"] + "' />")))
										.append($("<td style='padding: 8px;width:100%;height:100%;'/>")
											.append($("<div/>")
												.append($("<p>书名: " + books[i].title + "</p>"))
												// $TODO: isFunction detect
												.iff(books[i].author != undefined && books[i].author.length != 0)
													.append($("<p>作者: " + books[i].author[0] + "</p>"))  
													.end()
												.append($("<p>页数: " + books[i].pages + "</p>"))
												.append($("<p>出版社: " + books[i].publisher + "</p>"))
												.append($("<p>价格: " + books[i].price + "</p>")))))))
						.appendTo($("#searchDoubanBookList"));
					}	
					$("#searchDoubanBookList").listview('refresh');
				});
			}
		});
	});

	function refreshSearchBookListView(result, listId)
	{
		var list = $(listId);
		list.find("li").remove();

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
			.appendTo(list);
		}

		list.listview('refresh');
	}
})(jQuery);
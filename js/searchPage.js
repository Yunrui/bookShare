$(document).delegate("#searchBook", "pageinit", function() {
	//$TODO: switch to getJSON? 
    $.ajax({
				url: "searchBook.php?userId=1", 
				dataType: "json",
				success: function(result){
					refreshSearchBookListView(result);
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
								refreshSearchBookListView(result);
							},
							error: function(jqXHR, textStatus, errorThrown){
								alert(jqXHR + textStatus + errorThrown);
							},
				});
            }
        );
});


function refreshSearchBookListView(result)
{
	$("#searchBookList li").remove(); 

	for(var i = 0; i < result.length; i++){
		$("<li/>").append(
			$("<div/>").append(
				$("<table />")
					.append($("<tr style='vertical-align:top;'/>")
						.append($("<td />").append($("<img src='" + result[i].img + "' />")))
						.append($("<td style='padding: 12px;width:100%;height:100%;'/>")
							.append($("<div/>")
								.append($("<p>书名: " + result[i].bookName + "</p>"))
								.append($("<p>所有人: " + result[i].displayName + "</p>"))  
								.append($("<p>作者: " + result[i].author + "</p>"))
								.append($("<p>页数: " + result[i].pages + "</p>"))
								.append($("<p>出版社: " + result[i].publisher + "</p>"))
								.append($("<p>价格: " + result[i].price + "</p>"))
								.append($("<p>ISBD: " + result[i].isbn + "</p>")))))
					.append($("<tr style='vertical-align:top;'/>")
						.append($("<td style='padding: 3px;width:100%;height:100%;' colspan='2'/>")
							.append($("<div style='width:100%;height:100%;'/>")
								.append($("<span style='color:orange'>内容简介 </span>"))
								.append($("<span style='font-size:12px' />").text(result[i].description)))))))
		.appendTo($("#searchBookList"));
	}

	$("#searchBookList").listview('refresh');
}

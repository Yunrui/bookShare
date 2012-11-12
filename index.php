<!DOCTYPE html> 
<html> 
	<head> 
		<title>My Page</title> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
		<link rel="stylesheet" href="css/jqm-docs.css" />
	</head> 

	<body>
		
		<!-- 
			$TODO: how can I remove those fucking stupid duplicated secondary navigations?  
			--- Consider write an jQuery plugin which could just refresh part of UI later.
		-->
		<!-- searchBook Page -->
		<div data-role="page" class="type-interior" id="searchBook">

			<div data-role="header" data-theme="e">
				<h1>我的图书馆</h1>
			</div>

			<div data-role="content">	

				<div class="content-primary">
					<div data-role="fieldcontain" >
						<input type="search" name="search" id="search"/>
					</div>	
					<br />
					<ul data-role="listview"  data-theme="c" id="searchBookList">
					</ul>
				</div><!--/content-primary -->		
		
				<div class="content-secondary">
			
					<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
				
							<h3>More in this section</h3>
					
							<ul data-role="listview"  data-theme="c" data-dividertheme="d">
								<li data-theme="a"><a href="#searchBook">搜索图书</a></li>
								<li><a href="#myBook">我的图书</a></li>	
								<li><a href="#myFriend">我的好友</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->

		<!-- searchBook Page -->
		<div data-role="page" class="type-interior" id="myBook">

			<div data-role="header" data-theme="e">
				<h1>我的图书馆</h1>
			</div>

			<div data-role="content">	

				<div class="content-primary">
					<ul data-role="listview"  data-theme="c" id="myBookList">
					</ul>
				</div><!--/content-primary -->		
		
				<div class="content-secondary">
			
					<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
				
							<h3>More in this section</h3>
					
							<ul data-role="listview"  data-theme="c" data-dividertheme="d">
								<li><a href="#searchBook">搜索图书</a></li>
								<li data-theme="a"><a href="#myBook">我的图书</a></li>	
								<li><a href="#myFriend">我的好友</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->

		<!-- myfriend Page -->
		<div data-role="page" class="type-interior" id="myFriend">

			<div data-role="header" data-theme="e">
				<h1>我的图书馆</h1>
			</div>

			<div data-role="content">	

				<div class="content-primary">
					<h2>My Friends Page</h2>
				</div><!--/content-primary -->		
		
				<div class="content-secondary">
			
					<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
				
							<h3>More in this section</h3>
					
							<ul data-role="listview"  data-theme="c" data-dividertheme="d">
								<li><a href="#searchBook">搜索图书</a></li>
								<li><a href="#myBook">我的图书</a></li>	
								<li data-theme="a"><a href="#myFriend">我的好友</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->

		<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
		<script src="js/searchPage.js"></script>
	</body>
</html>


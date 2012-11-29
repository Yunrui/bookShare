<!DOCTYPE html> 
<html> 
	<head> 
		<title>�ҵ�ͼ���</title> 
		
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
		<link rel="stylesheet" href="css/jqm-docs.css" />
	</head> 

	<body>
		
		<!-- 
			$TODO: how can I remove those fucking stupid duplicated secondary navigations?  
			Consider write an jQuery plugin which could just refresh part of UI later.
		-->
		<!-- searchBook Page -->
		<div data-role="page" class="type-interior" id="searchBook">

			<div data-role="header" data-theme="e">
				<h1>�ҵ�ͼ���</h1>
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
								<li data-theme="a"><a href="#searchBook">����ͼ��</a></li>
								<li><a href="#myBook">�ҵ�ͼ��</a></li>	
								<li><a href="#myFriend">�ҵĺ���</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->

		<!-- myBook Page -->
		<div data-role="page" class="type-interior" id="myBook">

			<div data-role="header" data-theme="e">
				<h1>�ҵ�ͼ���</h1>
			</div>

			<div data-role="content">	

				<div class="content-primary">

					<!-- $TODO: setting footer here definitely a workaround -->
					<div data-role="footer" class="ui-bar" data-theme="e">
						<a href="#addBook" data-role="button" data-icon="plus" data-rel="dialog">���</a>
					</div> 
					<br />
					<ul data-role="listview"  data-theme="c" id="myBookList">
					</ul>

				</div><!--/content-primary -->		
		
				<div class="content-secondary">
			
					<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
				
							<h3>More in this section</h3>
					
							<ul data-role="listview"  data-theme="c" data-dividertheme="d">
								<li><a href="#searchBook">����ͼ��</a></li>
								<li data-theme="a"><a href="#myBook">�ҵ�ͼ��</a></li>	
								<li><a href="#myFriend">�ҵĺ���</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->

		<!-- myfriend Page -->
		<div data-role="page" class="type-interior" id="myFriend">

			<div data-role="header" data-theme="e">
				<h1>�ҵ�ͼ���</h1>
			</div>

			<div data-role="content">	

				<div class="content-primary">
					<h2>TBD</h2>
				</div><!--/content-primary -->		
		
				<div class="content-secondary">
			
					<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
				
							<h3>More in this section</h3>
					
							<ul data-role="listview"  data-theme="c" data-dividertheme="d">
								<li><a href="#searchBook">����ͼ��</a></li>
								<li><a href="#myBook">�ҵ�ͼ��</a></li>	
								<li data-theme="a"><a href="#myFriend">�ҵĺ���</a></li>	
							</ul>
					</div>
				</div>				
			</div><!-- /content -->

		</div><!-- /page -->


		<!-- addBook Page -->
		<div data-role="page" id="addBook">

			<div data-role="header" data-theme="d" style="max-width:630px;width:630px;">
				<h1>���ͼ��</h1>
			</div>

			<div data-role="content" data-theme="c" style="max-width:600px;width:600px;height:480px">	

				<div>
					<label for="searchDouban">Ϊ�����ҵ�����ͼ�飬������������������</label>
					<div data-role="fieldcontain" >
						<input type="search" name="searchDouban" id="searchDouban" data-theme="e"/>
					</div>
					<br/>
					<ul data-role="listview"  data-theme="c" id="searchDoubanBookList">
					</ul>	
				</div>	
					
			</div><!-- /content -->

		</div><!-- /page -->

		<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
		<script src="js/searchPage.js"></script>
	</body>
</html>


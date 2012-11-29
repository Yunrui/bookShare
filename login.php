<?php
	header("Content-Type: text/html; charset=utf-8");
	
	session_start();

	include_once( 'config.php' );
	include_once( 'saetv2.ex.class.php' );

	$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

	$code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Book Share</title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
		
		<style type="text/css">
		
			.HeaderLogo{
				width:15%;
				height:10%;
				float:left; 
				margin:2% 2% 2% 13%;
			}
			
			.HeaderLogin{
				width:15%;
				height:10%;
				float:right; 
				margin:2% 20% 2% 4%;
			}
			
			.BodyDiv{ 
				margin:5% 0% 3% 0%;
				width : 100%;
				padding : 3% 0%;
				background : #4682B4;
			}
			
			h1{
				color : white;
				font-size : 180%;
			}
			
			h2{
				color : white;
				font-size : 150%;
			}
			
			.ShareDiv{
				float:left;
				width : 16%;
				margin : 4% 3% 3% 18%;
			}
			
			.EasyDiv{
				float:left;
				width : 16%;
				margin : 4% 3% 3% 5%;
			}
			
			.SafeDiv{
				float:left;
				width : 16%;
				margin : 4% 15% 3% 3%;
			}
			
			.ContentPara{
				color : white;
				font-size : 100%;
			}
			
			.FooterDiv{
				color : #BEBEBE;
				font-size : 100%;
			}
			
			.ContentImage{
				width : 90%;
			}
			
			.HeadImage{
				width : 90%;
			}
			
		</style>
		
	</head>

	<body>
		
		<div data-role="page" >
			
			<div >
				<div class = "HeaderLogo">
					<img src="images/bookShareLogo.png" class = "HeadImage" />
				</div>
				
				
				<div class = "HeaderLogin">
					<a href="<?=$code_url?>"><img src="images/weibo_login.png" title="���������Ȩҳ��" alt="���������Ȩҳ��"  class = "HeadImage" /></a>
				</div>
				
				<br/>
			</div>
			
			<div class="BodyDiv" align=center >
				
				<h1>BookShare����������ͼ�飺</h1>
				
				<div class = "ShareDiv" >
					
					<img src="images/easy.png" class = "ContentImage" />
					
					<h2>����</h2>
					
					<p class = "ContentPara">					
						�����ĺ��ѷ����鼮������֪ʶ
					</p>
				</div>
				
				<div class = "EasyDiv">
					<img src="images/easy.png" class = "ContentImage" />
					
					<h2>���</h2>
					
					<p class = "ContentPara">					
						�κ�ʱ�䡢�κεص㡢�κ��նˣ�һ���ķ�������
					</p>
				</div>
				
				<div class = "SafeDiv">
					<img src="images/easy.png" class = "ContentImage" />
					
					<h2>��ȫ</h2>
					
					<p class = "ContentPara">					
						ֻ�����ĺ��ѣ����ܺ������з���
					</p>
				</div>
				
			</div><!--/content-primary -->		
			
			<div class = "FooterDiv" align=center>
				<p>Copyright @ who cares . All rights reserved.</p>
			</div>
			
		</div><!-- /page -->
		
		<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
		
		<script>

			$(".BodyDiv").height( $(window).height() * 0.7 );

		</script>
	</body>
</html>

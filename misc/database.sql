-- MySQL dump 10.13  Distrib 5.1.49, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: app_letsshare
-- ------------------------------------------------------
-- Server version	5.1.49-1ubuntu8.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `bookName` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `author` varchar(50) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `pages` varchar(50) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `bookName` (`bookName`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (5252901,'JavaScript Patterns','http://img3.douban.com/mpic/s4460994.jpg','Stoyan Stefanov','9780596806750','236','O\'Reilly Media, Inc.','USD 29.99','What\'s the best approach for developing an application with JavaScript? This book helps you answer that question with numerous JavaScript coding patterns and best practices. If you\'re an experienced developer looking to solve problems related to objects, functions, inheritance, and other language-specific categories, the abstractions and code templates in this guide are ideal -- whether you\'re writing a client-side, server-side, or desktop application with JavaScript. Written by JavaScript expert Stoyan Stefanov -- Senior Yahoo! Technical and architect of YSlow 2.0, the web page performance optimization tool -- JavaScript Patterns includes practical advice for implementing each pattern discussed, along with several hands-on examples. You\'ll also learn about anti-patterns: common programming approaches that cause more problems than they solve. Explore useful habits for writing high-quality JavaScript code, such as avoiding globals, using single var declarations, and more Learn why literal notation patterns are simpler alternatives to constructor functions Discover different ways to define a function in JavaScript Create objects that go beyond the basic patterns of using object literals and constructor functions Learn the options available for code reuse and inheritance in JavaScript Study sample JavaScript approaches to common design patterns such as Singleton, Factory, Decorator, and more Examine patterns that apply specifically to the client-side browser environment'),(2994925,'JavaScript:The Good Parts','http://img3.douban.com/mpic/s2931482.jpg','Douglas Crockford','9780596517748','250','O\'Reilly Media, Inc.','USD 29.99','Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book offers a detailed explanation of the features that make JavaScript an outstanding object-oriented programming language, and warns you about the bad parts. In the process, JavaScript: The Good Parts defines a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole. Author Douglas Crockford, a member of JavaScript 2.0 committee at ECMA, is considered by many people in the development community to be the JavaScript expert. A beautiful, elegant, lightweight and highly expressive language lies buried under a steaming pile of good intentions and blunders, he explains. The very good ideas include functions, loose typing, dynamic objects, and an expressive object literal notation. Awful ideas include a programming model based on global variables. With JavaScript: The Good Parts, you can release this elegant programming language from its old shell, and create more maintainable, extensible, and efficient code. The book\'s topics include: * Syntax * Objects * Functions * Inheritance * Arrays * Regular expressions * Methods * Style * Beautiful features Appendices summarize JavaScript\'s bad parts and awful parts. But the greatest benefit of studying the good parts is that you can avoid the need to unlearn the bad parts. If you want to learn more about the bad parts and how to use them badly, consult any other JavaScript book. JavaScript is the language of the Web -- the only language found in all browsers -- so avoiding it altogether is not an alternative. But, whether you\'re managing object libraries or just trying to get Ajax to run fast, Crockford\'s guidance in JavaScript: The Good Parts will help you create truly effective JavaScript code.'),(4312737,'jQuery:Novice to Ninja','http://img3.douban.com/mpic/s4686554.jpg','Earle Castledine','9780980576856','407','SitePoint','USD 39.95','jQuery: Novice to Ninja is a compilation of best-practice jQuery solutions to meet the most challenging JavaScript problems. In this question-and-answer book on jQuery, you\'ll find a cookbook of ready-to-go solutions to help breathe life into your web page. Topics covered include: - Scrolling, Resizing and Animating Webpage elements - Backgrounds, Slideshows, and Crossfaders - Menus, Tabs, and Panels - Buttons, Fields, and Controls - Lists, Trees, and Tables - Frames, Windows, and Dialogs - Adding interactivity with Ajax - Using the jQuery User Interface Themeroller - Writing your own jQuery plug-ins All code used to create each solution is available for download and guaranteed to be simple, efficient and cross-browser compatible.');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookOwn`
--

DROP TABLE IF EXISTS `bookOwn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookOwn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `readerId` int(11) DEFAULT NULL,
  `waitingList` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookOwn`
--

LOCK TABLES `bookOwn` WRITE;
/*!40000 ALTER TABLE `bookOwn` DISABLE KEYS */;
INSERT INTO `bookOwn` VALUES (1,3,4312737,NULL,0),(2,1,2994925,NULL,0),(3,3,5252901,NULL,0);
/*!40000 ALTER TABLE `bookOwn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,1,2),(2,1,3);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mapType` varchar(15) NOT NULL,
  `mapId` varchar(255) NOT NULL,
  `displayName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `displayName` (`displayName`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','1','YunRui SiMa'),(2,'test','2','Bin Wu'),(3,'test','3','Micky Liu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-11-11 21:48:21

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for socialnetworkudemy
DROP DATABASE IF EXISTS `socialnetworkudemy`;
CREATE DATABASE IF NOT EXISTS `socialnetworkudemy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `socialnetworkudemy`;

-- Dumping structure for table socialnetworkudemy.posts
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(80) DEFAULT NULL,
  `body` varchar(2000) DEFAULT NULL,
  `photo_path` varchar(400) DEFAULT NULL,
  `photo_content_type` varchar(400) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.posts: ~2 rows (approximately)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
REPLACE INTO `posts` (`id`, `title`, `body`, `photo_path`, `photo_content_type`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(48, 'Pengeboman di Sulawesi', 'Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh Pengeboman di Sulawesi dilakukan oleh', './uploads/images/posts/photo_1619079138881.jpg', 'image/jpeg', '2021-04-22 15:12:18', 10, NULL, 0),
	(49, 'Honda meluncurkan mobil baru', 'Honda meluncurkan mobil baru yakni Honda City Hatchback', './uploads/images/posts/photo_1619664655295.jpeg', 'image/jpeg', '2021-04-29 09:50:55', 2, NULL, 0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Dumping structure for table socialnetworkudemy.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `photo_content_type` varchar(10) DEFAULT NULL,
  `about` varchar(80) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `name`, `email`, `hashed_password`, `salt`, `photo_path`, `photo_content_type`, `about`, `created_at`, `updated_at`) VALUES
	(2, 'jane', 'jane@gmail.com', '$2b$10$tqcNyxawfBLF1hNg3wwkMuf1GaKGqQAcr6eA/PNxBmPp/Lznp.1Vy', '10', NULL, NULL, 'Vue JS Ninja', '2020-10-21 15:54:24', NULL),
	(4, 'Ariana Grande', 'ariana@gmail.com', '$2b$10$0IrWBhmY8YWgtGXDoavWhebcV.uMsrku5AzWh6Wwobv.tFen0fPPO', '10', './uploads/images/photo_1618730405515.jpg', 'image/jpeg', 'React JS Develpoer', '2020-10-21 18:24:18', '2021-04-18 14:20:05'),
	(10, 'Adam Levine', 'adam@gmail.com', '$2b$10$D72tsNki0OFogqSaAoH/aOrShDEprcKi5Dah282KUDBukUtaf0vsG', '10', './uploads/images/photo_1618730135883.png', NULL, 'I am a Node JS Developerr', '2020-12-01 14:10:12', '2021-04-22 12:03:28'),
	(11, 'Billie Eilish', 'billie@gmail.com', '$2b$10$dFoOTW03GZa0DoCb/.Fxt.ytVYXpcWleWWSWYXpo8eck7.oJHDtm6', '10', './uploads/images/photo_1618730011692.jpg', 'image/jpeg', 'Angular Developer', '2021-04-18 14:11:59', '2021-04-18 14:13:31'),
	(12, 'Bruno Marz', 'bruno@gmail.com', '$2b$10$Vl4x0IzTNOUNqSo7V3Ppd.bT5CBl4boLF82I2iLTrHHVPA.4dSHDi', '10', './uploads/images/photo_1618987704087.jpg', 'image/jpeg', 'Golang Developer', '2021-04-21 13:47:58', '2021-04-21 13:48:24');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table socialnetworkudemy.user_followers
DROP TABLE IF EXISTS `user_followers`;
CREATE TABLE IF NOT EXISTS `user_followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `follower_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.user_followers: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_followers` DISABLE KEYS */;
REPLACE INTO `user_followers` (`id`, `user_id`, `follower_id`) VALUES
	(83, 4, 2),
	(101, 4, 10),
	(102, 2, 10);
/*!40000 ALTER TABLE `user_followers` ENABLE KEYS */;

-- Dumping structure for table socialnetworkudemy.user_following
DROP TABLE IF EXISTS `user_following`;
CREATE TABLE IF NOT EXISTS `user_following` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `following_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.user_following: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_following` DISABLE KEYS */;
REPLACE INTO `user_following` (`id`, `user_id`, `following_id`) VALUES
	(86, 2, 4),
	(104, 10, 4),
	(105, 10, 2);
/*!40000 ALTER TABLE `user_following` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

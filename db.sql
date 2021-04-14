-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.37-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table socialnetworkudemy.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `body` varchar(2000) DEFAULT NULL,
  `photo` varchar(400) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.posts: ~3 rows (approximately)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
REPLACE INTO `posts` (`id`, `title`, `body`, `photo`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'a', 'doang', NULL, '2020-10-21 17:27:42', 2, '2020-10-22 15:14:11', 2),
	(2, 'Pilkada tetap dilakukan', 'Pilkada akan tetap dilakukan di saat pandemi covid 19', NULL, '2020-10-21 17:28:52', 2, NULL, 0),
	(3, 'Toyota mengeluarkan mobil baru', 'Toyota secara resmi mengeluarkan mobil baru yakni fortuner dan innova', NULL, '2020-10-21 17:29:51', 4, NULL, 0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Dumping structure for table socialnetworkudemy.user
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table socialnetworkudemy.user: ~3 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `name`, `email`, `hashed_password`, `salt`, `photo_path`, `photo_content_type`, `about`, `created_at`, `updated_at`) VALUES
	(2, 'jane', 'jane@gmail.com', '$2b$10$tqcNyxawfBLF1hNg3wwkMuf1GaKGqQAcr6eA/PNxBmPp/Lznp.1Vy', '10', NULL, NULL, NULL, '2020-10-21 15:54:24', NULL),
	(4, 'om om Gangster', 'omgeng@gmail.com', '$2b$10$0IrWBhmY8YWgtGXDoavWhebcV.uMsrku5AzWh6Wwobv.tFen0fPPO', '10', './uploads/images/photo_1613645784181.png', 'image/png', 'React JS Develpoer', '2020-10-21 18:24:18', '2021-02-18 17:56:24'),
	(10, 'ucok', 'ucok@gmail.com', '$2b$10$D72tsNki0OFogqSaAoH/aOrShDEprcKi5Dah282KUDBukUtaf0vsG', '10', './uploads/images/photo_1613643419454.png', NULL, 'I am a Node JS Developerr', '2020-12-01 14:10:12', '2021-02-18 18:28:26');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

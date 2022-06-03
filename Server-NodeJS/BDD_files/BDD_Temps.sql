-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 18 jan. 2022 à 08:12
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `utilisateurs`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `MDP` varchar(50) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `admin` varchar(50) NOT NULL,
  `pdp` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nom` (`pseudo`),
  KEY `MDP` (`MDP`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `MDP`, `pseudo`, `admin`, `pdp`) VALUES
(40, '23w9j4', 'Asgarrrr', 'true', 'default.png'),
(47, 'la main', 'lucum', 'true', 'default.png'),
(48, '123', 'Woulfty', 'true', 'default.png'),
(60, '123456789', 'Admin', 'false ', 'default.png'),
(69, '123', 'lea', 'false', 'default.png'),
(70, '456', 'lolo', 'false', 'default.png'),
(79, 'le lapin', 'pinpin', 'false', 'default.jpg'),
(80, '123', 'Julien', 'false', 'default.png'),
(81, 'pxcleme', 'pxcleme', 'false', 'default.png'),
(82, '33', 'alex', 'false', 'default.png'),
(83, '123', 'UwU', 'false', 'default.png'),
(84, '030120', 'julien0301', 'false', 'default.png'),
(85, 'Hentai', 'Zerzeusse', 'false', 'default.png'),
(88, '123', 'conan', 'false', 'default.png'),
(89, 'weshlesgars', 'Louis', 'false', 'default.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

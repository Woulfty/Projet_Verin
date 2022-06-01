-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 30 mai 2022 à 09:37
-- Version du serveur :  10.3.29-MariaDB-0+deb10u1
-- Version de PHP : 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Verin`
--

-- --------------------------------------------------------

--
-- Structure de la table `Affaire`
--

CREATE TABLE `Affaire` (
  `idAffaire` int(11) NOT NULL,
  `Capteur` int(11) NOT NULL DEFAULT 1,
  `Frequence` int(11) NOT NULL,
  `TempAcquisition` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Affaire`
--

INSERT INTO `Affaire` (`idAffaire`, `Capteur`, `Frequence`, `TempAcquisition`, `PV`, `Date`) VALUES
(7, 1, 5, 500, 1, '2022-04-27 16:28:43'),
(8, 2, 4, 500, 2, '2022-04-28 16:28:43'),
(9, 2, 4, 500, 2, '2022-04-29 16:28:43'),
(10, 2, 4, 500, 2, '2022-04-30 16:28:43'),
(11, 2, 4, 500, 2, '2022-05-01 16:28:43'),
(13, 2, 4, 500, 2, '2022-05-02 16:28:42'),
(14, 2, 4, 500, 2, '2022-05-24 09:02:33'),
(15, 1, 6, 500, 2, '2022-05-24 14:53:08'),
(16, 1, 4, 1, 0, '2022-05-25 09:09:32');

-- --------------------------------------------------------

--
-- Structure de la table `Essaie`
--

CREATE TABLE `Essaie` (
  `idEssaie` int(11) NOT NULL,
  `idAffaire` int(11) NOT NULL,
  `Frequence` int(11) NOT NULL,
  `TempAcquisition` int(11) NOT NULL,
  `Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Essaie`
--

INSERT INTO `Essaie` (`idEssaie`, `idAffaire`, `Frequence`, `TempAcquisition`, `Value`) VALUES
(1, 7, 500, 6, 8),
(2, 7, 500, 1, 12),
(3, 7, 800, 1, 20),
(4, 8, 500, 6, 33),
(5, 8, 500, 7, 55),
(50, 7, 546, 786, 12),
(51, 8, 453, 78, 5),
(52, 8, 786, 7869, 20),
(53, 8, 45, 78, 26),
(54, 8, 78, 45, 14),
(55, 9, 45, 786, 98),
(56, 9, 56, 78, 50),
(57, 9, 487, 789, 64),
(58, 9, 45, 86, 25),
(59, 10, 45, 12, 65),
(60, 10, 45, 78, 80),
(61, 10, 48, 78, 54),
(62, 11, 45, 78, 45),
(63, 11, 88, 45, 65),
(64, 11, 45, 16, 87),
(65, 13, 48, 45, 0),
(66, 13, 45, 12, 0),
(67, 13, 45, 78, 0),
(68, 13, 45, 15, 45),
(69, 7, 45, 45, 84),
(70, 7, 45, 45, 75),
(71, 7, 45, 45, 46),
(92, 16, 45, 78, 5),
(93, 16, 45, 78, 15),
(94, 16, 48, 87, 30),
(95, 16, 45, 86, 50),
(96, 16, 457, 87, 80);

-- --------------------------------------------------------

--
-- Structure de la table `PV`
--

CREATE TABLE `PV` (
  `idPV` int(11) NOT NULL,
  `idAffaire` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Texte` varchar(280) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `PV`
--

INSERT INTO `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`) VALUES
(1, 7, 1, 'Rien à dire.', '2022-05-30 07:37:21'),
(2, 7, 1, 'Erreur lors du deuxièmes test. Le vérin présente une défaillance lors du test.', '2022-05-30 07:37:16'),
(3, 8, 1, 'Test Numéro 3', '2022-04-26 11:54:39'),
(4, 7, 1, 'Résolution erreur, le vérin avait une fuite lors de la pressurisation.', '2022-05-30 07:37:07'),
(5, 7, 1, 'Sur le graphique il y a une grosse perte de pression, est-ce normal ?', '2022-05-02 12:19:17'),
(7, 10, 1, 'Test du jour.', '2022-05-30 07:37:00'),
(9, 13, 1, 'Bonjour je suis un test.', '2022-05-30 07:36:52');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `idUser` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`idUser`, `Username`, `Mdp`) VALUES
(0, 'root', 'root'),
(1, 'greg', 'greg'),
(2, 'User', 'User');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Affaire`
--
ALTER TABLE `Affaire`
  ADD PRIMARY KEY (`idAffaire`),
  ADD KEY `PV` (`PV`);

--
-- Index pour la table `Essaie`
--
ALTER TABLE `Essaie`
  ADD PRIMARY KEY (`idEssaie`),
  ADD KEY `Affaire` (`idAffaire`);

--
-- Index pour la table `PV`
--
ALTER TABLE `PV`
  ADD PRIMARY KEY (`idPV`),
  ADD KEY `User` (`idUser`),
  ADD KEY `Affaire` (`idAffaire`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Affaire`
--
ALTER TABLE `Affaire`
  MODIFY `idAffaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `Essaie`
--
ALTER TABLE `Essaie`
  MODIFY `idEssaie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT pour la table `PV`
--
ALTER TABLE `PV`
  MODIFY `idPV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Essaie`
--
ALTER TABLE `Essaie`
  ADD CONSTRAINT `Essaie_ibfk_1` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`);

--
-- Contraintes pour la table `PV`
--
ALTER TABLE `PV`
  ADD CONSTRAINT `PV_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `User` (`idUser`),
  ADD CONSTRAINT `PV_ibfk_2` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
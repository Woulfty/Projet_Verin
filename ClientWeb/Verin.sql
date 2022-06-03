-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 02 juin 2022 à 09:50
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
  `NumEssaie` int(11) NOT NULL,
  `Debit` float NOT NULL,
  `Value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Essaie`
--

INSERT INTO `Essaie` (`idEssaie`, `idAffaire`, `NumEssaie`, `Debit`, `Value`) VALUES
(1, 7, 1, 0, 8),
(2, 7, 6, 0, 12),
(3, 7, 7, 0, 20),
(4, 8, 6, 0, 33),
(5, 8, 1, 0, 55),
(50, 7, 5, 0, 12),
(51, 8, 2, 0, 5),
(52, 8, 3, 0, 20),
(53, 8, 4, 0, 26),
(54, 8, 5, 0, 14),
(55, 9, 4, 0, 98),
(56, 9, 2, 0, 50),
(57, 9, 3, 0, 64),
(58, 9, 1, 0, 25),
(59, 10, 5, 0, 65),
(60, 10, 0, 0, 80),
(61, 10, 0, 0, 54),
(62, 11, 0, 0, 45),
(63, 11, 0, 0, 65),
(64, 11, 0, 0, 87),
(65, 13, 0, 0, 0),
(66, 13, 0, 0, 0),
(67, 13, 0, 0, 0),
(68, 13, 0, 0, 45),
(69, 7, 2, 0, 84),
(70, 7, 4, 0, 75),
(71, 7, 3, 0, 46),
(92, 16, 0, 0, 5),
(93, 16, 0, 0, 15),
(94, 16, 0, 0, 30),
(95, 16, 0, 0, 50);

-- --------------------------------------------------------

--
-- Structure de la table `PV`
--

CREATE TABLE `PV` (
  `idPV` int(11) NOT NULL,
  `idAffaire` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Texte` varchar(1000) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `PV`
--

INSERT INTO `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`) VALUES
(25, 16, 8, 'Affaire rondement mener, le rendement est plus qu\'acceptable. Je contact Véolia pour qu\'il récupère leur camion demain au plus tard. Je donne la suite au coordo technique. ', '2022-06-02 07:33:41');

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
(7, 'root', 'root'),
(8, 'greg', 'greg'),
(9, 'kylian', 'kiki'),
(10, 'nico', 'nico'),
(11, 'alex', 'alex');

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
  MODIFY `idEssaie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT pour la table `PV`
--
ALTER TABLE `PV`
  MODIFY `idPV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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

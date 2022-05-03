-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 02 mai 2022 à 16:30
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
(13, 2, 4, 500, 2, '2022-05-02 16:28:42');

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
(3, 7, 800, 1, 20);

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
(1, 7, 1, 'Le vérin à été testé avec succés. Il est conforme a la norme NF42.', '2022-05-02 12:17:34'),
(2, 7, 1, 'Erreur lors du deuxièmes test. le verin présente une défaillance lors du test.', '2022-05-02 12:17:34'),
(3, 8, 1, 'Test Numéro 3', '2022-04-26 11:54:39'),
(4, 7, 1, 'Résolution erreur, le verin avait une fuite lors de la pressurisation.', '2022-05-02 12:17:34'),
(5, 7, 1, 'Sur le graphique il y a une grosse perte de pression, est-ce normal ?', '2022-05-02 12:19:17'),
(6, 7, 1, 'Oui, j ai accidentellement relâché la pression lors du test.', '2022-05-02 12:19:17');

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
  MODIFY `idAffaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `Essaie`
--
ALTER TABLE `Essaie`
  MODIFY `idEssaie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `PV`
--
ALTER TABLE `PV`
  MODIFY `idPV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
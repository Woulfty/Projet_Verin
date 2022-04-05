-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 05 avr. 2022 à 16:10
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
-- Base de données : `verain`
--

-- --------------------------------------------------------

--
-- Structure de la table `Affaire`
--

CREATE TABLE `Affaire` (
  `idAffaire` int(11) NOT NULL,
  `TypeAffaire` varchar(50) NOT NULL,
  `Capteur` int(11) NOT NULL,
  `tacquisition` float NOT NULL,
  `PV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Affaire`
--

INSERT INTO `Affaire` (`idAffaire`, `TypeAffaire`, `Capteur`, `tacquisition`, `PV`) VALUES
(1, '1', 1, 1, 1),
(2, '2', 2, 2, 2),
(3, '3', 3, 3, 3),
(4, '4', 4, 4, 4),
(5, '5', 5, 5, 5);

-- --------------------------------------------------------

--
-- Structure de la table `Essai`
--

CREATE TABLE `Essai` (
  `idEssai` int(11) NOT NULL,
  `Fréquence` float NOT NULL,
  `Temp` float NOT NULL,
  `idAffaire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Essai`
--

INSERT INTO `Essai` (`idEssai`, `Fréquence`, `Temp`, `idAffaire`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5);

-- --------------------------------------------------------

--
-- Structure de la table `PV`
--

CREATE TABLE `PV` (
  `idPV` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idAffaire` int(11) NOT NULL,
  `Texte` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `PV`
--

INSERT INTO `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`) VALUES
(1, 1, 1, 'Rentrez vos informations N°1.'),
(2, 2, 2, 'Rentrez vos informations N°2.'),
(3, 3, 3, 'Rentrez vos informations N°3.'),
(4, 4, 4, 'Rentrez vos informations N°4.'),
(5, 5, 5, 'Rentrez vos informations N°5.');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `idUser` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL,
  `DateCreation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`idUser`, `Username`, `Mdp`, `DateCreation`) VALUES
(1, 'Admin', 'Admin', '2038-01-19 02:14:08'),
(2, 'root', 'root', '2038-01-19 02:14:08'),
(3, 'greg', 'greg', '2022-03-25 14:17:50');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Affaire`
--
ALTER TABLE `Affaire`
  ADD PRIMARY KEY (`idAffaire`);

--
-- Index pour la table `Essai`
--
ALTER TABLE `Essai`
  ADD PRIMARY KEY (`idEssai`),
  ADD KEY `IDAffaire` (`idAffaire`);

--
-- Index pour la table `PV`
--
ALTER TABLE `PV`
  ADD PRIMARY KEY (`idPV`);

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
  MODIFY `idAffaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT pour la table `Essai`
--
ALTER TABLE `Essai`
  MODIFY `idEssai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `PV`
--
ALTER TABLE `PV`
  MODIFY `idPV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=668;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Essai`
--
ALTER TABLE `Essai`
  ADD CONSTRAINT `Essai_ibfk_1` FOREIGN KEY (`IDAffaire`) REFERENCES `Affaire` (`idAffaire`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
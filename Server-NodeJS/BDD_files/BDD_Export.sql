/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Affaire` (
  `idAffaire` int(11) NOT NULL AUTO_INCREMENT,
  `Capteur` int(11) NOT NULL DEFAULT 1,
  `Frequence` int(11) NOT NULL,
  `TempAcquisition` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idAffaire`),
  KEY `PV` (`PV`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Essaie` (
  `idEssaie` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `NumEssaie` int(11) NOT NULL,
  `Debit` float NOT NULL,
  `Value` float NOT NULL,
  PRIMARY KEY (`idEssaie`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `Essaie_ibfk_1` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 101 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: PV
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `PV` (
  `idPV` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Texte` varchar(1000) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idPV`),
  KEY `User` (`idUser`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `PV_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `User` (`idUser`),
  CONSTRAINT `PV_ibfk_2` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: PV
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: User
# ------------------------------------------------------------

INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (7, 'root', 'root');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (8, 'greg', 'greg');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (9, 'kylian', 'kiki');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (10, 'nico', 'nico');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (11, 'alex', 'alex');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

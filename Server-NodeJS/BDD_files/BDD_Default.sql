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
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(100) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

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
  (0, 'root', '63a9f0ea7bb98050796b649e85481845');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (1, 'greg', 'ea26b0075d29530c636d6791bb5d73f4');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (2, 'kylian', '0d61130a6dd5eea85c2c5facfe1c15a7');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (3, 'nico', '410ec15153a6dff0bed851467309bcbd');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (4, 'alex', '534b44a19bf18d20b71ecc4eb77c572f');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
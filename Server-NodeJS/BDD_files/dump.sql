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
  `Capteur` int(11) NOT NULL,
  `TotalTime` float NOT NULL,
  `Frequence` int(11) NOT NULL,
  `Essaie` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  PRIMARY KEY (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 59 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Essai
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Essai` (
  `idEssai` int(11) NOT NULL AUTO_INCREMENT,
  `Value` int(11) NOT NULL,
  `NumTest` int(11) NOT NULL,
  PRIMARY KEY (`idEssai`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: PV
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `PV` (
  `idPV` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idAffaire` int(11) NOT NULL,
  `Texte` text NOT NULL,
  PRIMARY KEY (`idPV`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL,
  `DateCreation` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 668 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------

INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (6, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (7, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (8, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (9, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (10, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (11, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (12, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (13, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (14, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (15, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (16, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (17, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (18, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (19, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (20, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (21, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (22, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (23, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (24, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (25, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (26, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (27, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (28, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (29, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (30, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (31, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (32, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (33, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (34, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (35, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (36, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (37, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (38, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (39, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (40, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (41, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (42, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (43, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (44, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (45, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (46, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (47, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (48, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (49, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (50, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (51, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (52, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (53, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (54, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (55, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (56, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (57, 1, 1, 1, 1, 1);
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `TotalTime`,
    `Frequence`,
    `Essaie`,
    `PV`
  )
VALUES
  (58, 1, 1, 1, 1, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Essai
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: PV
# ------------------------------------------------------------

INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (3, 666, 666, '666');
INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (4, 666, 666, '666');
INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (5, 666, 666, '666');
INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (6, 666, 666, '666');
INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (7, 666, 666, '666');
INSERT INTO
  `PV` (`idPV`, `idUser`, `idAffaire`, `Texte`)
VALUES
  (8, 666, 0, 'Testqsdqsdqsdqsdq avec du texte');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: User
# ------------------------------------------------------------

INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`, `DateCreation`)
VALUES
  (666, 'Satan', 'NonHash', '2022-03-25 13:40:47');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`, `DateCreation`)
VALUES
  (667, 'greg', 'greg', '2022-03-25 15:17:50');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

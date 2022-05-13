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
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Essaie` (
  `idEssaie` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `Frequence` int(11) NOT NULL,
  `TempAcquisition` int(11) NOT NULL,
  `Value` int(11) NOT NULL,
  PRIMARY KEY (`idEssaie`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `Essaie_ibfk_1` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: PV
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `PV` (
  `idPV` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Texte` varchar(280) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idPV`),
  KEY `User` (`idUser`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `PV_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `User` (`idUser`),
  CONSTRAINT `PV_ibfk_2` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------

INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (7, 1, 5, 500, 1, '2022-04-27 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (8, 2, 4, 500, 2, '2022-04-28 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (9, 2, 4, 500, 2, '2022-04-29 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (10, 2, 4, 500, 2, '2022-04-30 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (11, 2, 4, 500, 2, '2022-05-01 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (13, 2, 4, 500, 2, '2022-05-02 16:28:42');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `Frequence`,
    `TempAcquisition`,
    `Value`
  )
VALUES
  (1, 7, 500, 6, 8);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `Frequence`,
    `TempAcquisition`,
    `Value`
  )
VALUES
  (2, 7, 500, 1, 12);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `Frequence`,
    `TempAcquisition`,
    `Value`
  )
VALUES
  (3, 7, 800, 1, 20);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `Frequence`,
    `TempAcquisition`,
    `Value`
  )
VALUES
  (4, 7, 500, 1, 8);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `Frequence`,
    `TempAcquisition`,
    `Value`
  )
VALUES
  (5, 8, 500, 1, 8);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: PV
# ------------------------------------------------------------

INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    1,
    7,
    1,
    'Le vérin à été testé avec succés. Il est conforme a la norme NF42.',
    '2022-05-02 14:17:34'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    2,
    7,
    1,
    'Erreur lors du deuxièmes test. le verin présente une défaillance lors du test.',
    '2022-05-02 14:17:34'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (3, 8, 1, 'Test Numéro 3', '2022-04-26 13:54:39');
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    4,
    7,
    1,
    'Résolution erreur, le verin avait une fuite lors de la pressurisation.',
    '2022-05-02 14:17:34'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    5,
    7,
    1,
    'Sur le graphique il y a une grosse perte de pression, est-ce normal ?',
    '2022-05-02 14:19:17'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    6,
    7,
    1,
    'Oui, j ai accidentellement relâché la pression lors du test.',
    '2022-05-02 14:19:17'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: User
# ------------------------------------------------------------

INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (0, 'root', 'root');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (1, 'greg', 'greg');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (2, 'User', 'User');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

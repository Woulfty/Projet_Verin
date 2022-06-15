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
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 134 DEFAULT CHARSET = utf8mb4;

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
  KEY `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(100) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

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
  (1, 1, 6, 1000, 2, '2022-06-03 11:35:10');
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
  (18, 1, 6, 1000, 2, '2022-06-03 13:21:15');
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
  (19, 1, 6, 1000, 2, '2022-06-03 13:23:45');
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
  (20, 1, 6, 1000, 2, '2022-06-03 13:29:42');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (113, 1, 1, 82, 0.714928);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (114, 1, 2, 81.24, 0.99775);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (115, 1, 3, 88.07, 0.99215);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (116, 1, 4, 88.07, 0.992159);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (117, 18, 1, 88.07, 0.0785708);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (118, 18, 2, 84.27, 1);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (119, 18, 3, 164.75, 0.256753);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (120, 18, 4, 666.59, -0.028089);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (121, 18, 5, 605.86, 1.1115);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (122, 19, 0, 79.72, 0.15991);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (123, 19, 1, 176.14, 0.141729);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (124, 19, 2, 194.36, 0.547804);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (125, 19, 3, 214.86, -0.0268439);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (126, 19, 4, 176.14, 0.994397);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (127, 19, 5, 141.97, 0.116725);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (128, 20, 0, 127.55, 0.996648);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (129, 20, 1, 293.82, 0.552811);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (130, 20, 2, 658.24, 0.666303);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (131, 20, 3, 663.56, 0.145435);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (132, 20, 4, 267.25, 1.512);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (133, 20, 5, 268.76, 0.20787);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: PV
# ------------------------------------------------------------

INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    26,
    19,
    7,
    ' \t? \t? \t? \t? \t? \t? \t? \t? \t?',
    '2022-06-03 13:29:26'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    27,
    19,
    7,
    '??????????????? ???? ',
    '2022-06-03 13:30:13'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (28, 20, 8, 'Bravo a tous !', '2022-06-03 13:32:52');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: User
# ------------------------------------------------------------

INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (7, 'root', '63a9f0ea7bb98050796b649e85481845');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (8, 'greg', 'ea26b0075d29530c636d6791bb5d73f4');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (9, 'kylian', '0d61130a6dd5eea85c2c5facfe1c15a7');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (10, 'Nicolas', 'deb97a759ee7b8ba42e02dddf2b412fe');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (11, 'alex', '534b44a19bf18d20b71ecc4eb77c572f');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

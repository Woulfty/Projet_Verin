#include "essai.h"

essai::essai(QString Ip, QString DataNam, QString Login, QString Mdp)
{
	db = QSqlDatabase::addDatabase("QMYSQL");
	db.setHostName(Ip);
	db.setDatabaseName(DataNam);
	db.setUserName(Login);
	db.setPassword(Mdp);
	QSqlQuery requete(db);

}


QVector<QString> essai::selectAffaire(QString idaffaire) {
	QSqlQuery requetes(db);
	QVector<QString> stringVector(50);

	//if (db.open()) {
	requetes.prepare("SELECT `idEssaie` FROM `Essaie` WHERE `idAffaire` = ?");
	requetes.addBindValue(idaffaire);
	requetes.exec();
	int id;
	int ID = 0;

	for (int i = 1; requetes.next(); i++) {
		ID++;

		stringVector[i] = requetes.value(0).toString();
		qDebug() << "les valeur du tableau" + stringVector.at(i);
	}
	stringVector[0] = QString::number(ID);
	//}
	return stringVector;
}
QVector<QString> essai::selectEssaiID(QString idEssai) {
	QSqlQuery requetes(db);
	QVector<QString> infoEssai(5);


	requetes.prepare("SELECT * FROM `Essaie` WHERE `idEssaie` = ?");
	requetes.addBindValue(idEssai);
	requetes.exec();
	requetes.next();

	infoEssai[0] = requetes.value(0).toString();
	infoEssai[1] = requetes.value(1).toString();
	infoEssai[2] = requetes.value(2).toString();
	infoEssai[3] = requetes.value(3).toString();
	infoEssai[4] = requetes.value(4).toString();



	return infoEssai;
}

void essai::supprimeEssai(QString idEssai)
{
	QSqlQuery requetes(db);
	requetes.prepare("DELETE FROM `Essaie` WHERE `idEssaie` = ?");
	requetes.addBindValue(idEssai);
	requetes.exec();
}


void essai::creatEssai(QString idAffaire, QString Frequence, QString TempAcquisition, QString Grandeur) {
	QSqlQuery requetes(db);
	requetes.prepare("INSERT INTO `Essaie`(`idAffaire`, `Frequence`, `TempAcquisition`, `Grandeur`) VALUES (?, ?, ?, ?)");
	requetes.addBindValue(idAffaire);
	requetes.addBindValue(Frequence);
	requetes.addBindValue(TempAcquisition);
	requetes.addBindValue(Grandeur);
	requetes.exec();
}

void essai::updateEssai(QString idEssai, QString idAffaire, QString Frequence, QString TempAcquisition, QString Grandeur) {
	QSqlQuery requetes(db);
	requetes.prepare("UPDATE `Essaie` SET `idAffaire`= ?,`Frequence`= ?,`TempAcquisition`= ?,`Grandeur`= ? WHERE `idEssaie` = ?");
	requetes.addBindValue(idAffaire);
	requetes.addBindValue(Frequence);
	requetes.addBindValue(TempAcquisition);
	requetes.addBindValue(Grandeur);
	requetes.addBindValue(idEssai);
	requetes.exec();
}

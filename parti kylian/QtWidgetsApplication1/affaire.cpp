#include "affaire.h"


int affaire::newAffaire()
{
	return 0;
}

int affaire::save()
{

	QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
	db.setHostName("192.168.65.20");
	db.setDatabaseName("verain");
	db.setUserName("admin");
	db.setPassword("admin");

	if (db.open()) {
		qDebug() << "Connexion BDD reussie";
		QSqlQuery requete;
		requete.prepare("INSERT INTO `Affaire`(`TypeAffaire`, `Capteur`, `TotalTime`, `Frequence`, `Essaie`, `PV`) VALUES (?,?,?,?,?,?)");
		//requete.addBindValue();
		//requete.addBindValue();
		//requete.addBindValue();
		//requete.addBindValue();
		//requete.addBindValue();
		//requete.addBindValue();

		requete.exec();
		db.close();
	}
	else {
		qDebug() << "Erreur connexion BDD";
	}


	return 0;
}
int affaire::selectAffaire() {
	return 0;
}

int affaire::updateAffaire() {
	return 0;
}

int affaire::deleteAffaire() {
	return 0;
}
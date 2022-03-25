#include "BDD.h"

void BDD::ConnectToBDD(QString Adresse, QString Username, QString Mdp)
{
	QSqlDatabase BDD = QSqlDatabase::addDatabase("QMYSQL");
	BDD.setHostName(Adresse);
	BDD.setDatabaseName("");
	BDD.setUserName(Username);
	BDD.setPassword(Mdp);

	if (BDD.open()) {

	}
	else {

		exit(1);
	}
}

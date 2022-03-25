#include "BDD.h"


BDD::BDD() {
	qDebug() << "test";
}

void BDD::ConnectToBDD(QString Adresse, QString Username, QString Mdp)
{
	bdd = &QSqlDatabase::addDatabase("QMYSQL");
	bdd->setHostName(Adresse);
	bdd->setDatabaseName("verain");
	bdd->setUserName(Username);
	bdd->setPassword(Mdp);

	if (bdd->open()) {
		qDebug() << "Connection OK";
	}
	else {

		// exit(1);
	}
}


void BDD::EraseAffaire(int Affaire)
{
	QSqlQuery Erase;
	Erase.prepare("DELETE FROM `Affaire` WHERE `id` = ?");
	Erase.addBindValue(Affaire);
	 
	Erase.exec();
}

void BDD::UpdateAffaire(int Affaire, int Capteur, int Frequence, int TempAcquisition)
{

}

void BDD::AddAffaire()
{

}

void EraseAffaire(int Affaire)
{
}

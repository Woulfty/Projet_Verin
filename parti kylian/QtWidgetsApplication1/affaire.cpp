#include "affaire.h"

 affaire::affaire(QString Ip, QString DataNam, QString Login, QString Mdp)
 {
	 //QString Ip, QString DataNam, QString Login, QString Mdp
	 db = QSqlDatabase::addDatabase("QMYSQL");
	 //db = QSqlDatabase::addDatabase("QSQLITE");
	 db.setHostName(Ip);
	 db.setDatabaseName(DataNam);
	 db.setUserName(Login);
	 db.setPassword(Mdp);
	 QSqlQuery requete(db);
	 //if (db.open()) {
		 qDebug() << "la connexion a la bdd ok";
		 //requete.prepare("SELECT * FROM `User` WHERE `idUser` = ?");
		 //requete.addBindValue(1);
		 //requete.exec();
		 //db.close();
	 //}
	 //else {
		 //qDebug() << "la connexion a la bdd no ok";
	 //}
}

int affaire::newAffaire(QString Capteur, QString Frequence, QString TempAcquisition, QString Pv)
{
	this->IDCapteur = Capteur;
	this->Frequence = Frequence;
	this->TotalTime = TempAcquisition;
	this->Pv = Pv;
	return 0;
}

int affaire::save()
{
	QSqlQuery requetes(db);
	if (db.open()) {
		requetes.prepare("INSERT INTO `Affaire`(`Capteur`, `Frequence`, `TempAcquisition`, `PV`) VALUES (?,?,?,?)");
		requetes.addBindValue(this->IDCapteur);
		requetes.addBindValue(this->Frequence);
		requetes.addBindValue(this->TotalTime);
		requetes.addBindValue(this->Pv);
		requetes.exec();
		db.close();
	}
	else {
		qDebug() << "Erreur connexion BDD";
	}


	return 0;
}
int affaire::selectAffaire() {
	QSqlQuery requetes(db);
	if (db.open()) {
		//SELECT * FROM `Affaire` ORDER BY `Affaire`.`idAffaire` DESC LIMIT 1
		requetes.prepare("SELECT `idAffaire` FROM `Affaire` ORDER BY `Affaire`.`idAffaire` DESC LIMIT 1");
		requetes.exec();
		requetes.next();
		int id = requetes.value(0).toInt();
		qDebug() << "l'id de l'affaire et " + QString::number(id);
		return id;
	}
	else{ 
		return 0;
	}
}

int affaire::updateAffaire(QString id, QString capteur, QString temp, QString frequence) {
	QSqlQuery requetes(db);
	if (db.open()) {
		requetes.prepare("UPDATE `Affaire` SET `Capteur`= ?,`TempAcquisition`= ?, `Frequence` = ? WHERE `idAffaire` = ?");
		requetes.addBindValue(capteur);
		requetes.addBindValue(temp);
		requetes.addBindValue(frequence);
		requetes.addBindValue(id);
		requetes.exec();
		db.close();
	}

	return 0;
}

int affaire::deleteAffaire(QString Id) {
	QSqlQuery requetes(db);
	if (db.open()) {
	
		requetes.prepare("DELETE FROM `Affaire` WHERE `idAffaire` = ?");
		requetes.addBindValue(Id);
		requetes.exec();
		qDebug() << db.lastError();
		db.close();
	}
	return 0;
}
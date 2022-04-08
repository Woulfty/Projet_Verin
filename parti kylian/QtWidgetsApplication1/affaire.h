#pragma once
#include <QSqlDatabase>
#include <QtSql/QtSql>
#include <QtSql>
#include <qsqldatabase.h>
#include <qdebug.h>
class affaire
{
private:
	QSqlDatabase  db;
	QSqlQuery requete;
	QString id;
	QString IdAffaire;
	QString IDCapteur;
	QString TotalTime;
	QString Frequence;
	QString Pv;
	//char Pv;

public:
	affaire(QString Ip, QString DataNam, QString Login, QString Mdp);
	int newAffaire(QString, QString, QString, QString);
	int save();
	int selectAffaire();
	int updateAffaire(QString, QString, QString, QString);
	int deleteAffaire(QString Id);


};


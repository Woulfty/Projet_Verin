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
	int id;
	int IdAffaire;
	int IDCapteur;
	float TotalTime;
	float Frequence;
	//char Pv;

public:
	affaire(QString Ip, QString DataNam, QString Login, QString Mdp);
	int newAffaire();
	int save();
	int selectAffaire();
	int updateAffaire(QString, QString, QString);
	int deleteAffaire(QString Id);


};


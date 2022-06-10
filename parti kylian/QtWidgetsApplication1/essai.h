#pragma once
#include <QSqlDatabase>
#include <QtSql/QtSql>
#include <QtSql>
#include <qsqldatabase.h>
#include <qdebug.h>

class essai
{
private:
	QSqlDatabase  db;
	QSqlQuery requete;
	QString id;
	QString IdAffaire;
	QString Frequence;
	QString tempAcquisition;
	QString	Grandeur;

public:
	essai(QString Ip, QString DataNam, QString Login, QString Mdp);
	QVector<QString> selectEssais(QString);
	QVector<QString> selectEssaiID(QString idEssai);
	void supprimeEssai(QString);
	void creatEssai(QString idAffaire, QString Frequence, QString TempAcquisition, QString Grandeur);
	void updateEssai(QString idEssai, QString idAffaire, QString Frequence, QString TempAcquisition, QString Grandeur);
};


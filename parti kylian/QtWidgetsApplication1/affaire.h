#pragma once
#include <QSqlDatabase>
#include <QtSql/QtSql>
#include <qsqldatabase.h>
#include <qdebug.h>
class affaire
{
public:
	int id;
	int TypeAffaire;
	int IDCapteur;
	float TotalTime;
	float Frequence;
	char Pv;

private:
	int newAffaire();
	int save();


};


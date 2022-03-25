#pragma once

#include <QObject>
#include <QtSql/QtSql>
//#include <qsqldatabase.h>

class BDD : public QObject
{
	Q_OBJECT

private:
	QSqlDatabase * BDD;

public:

	void ConnectToBDD(QString Adresse, QString Username, QString Mdp);
};


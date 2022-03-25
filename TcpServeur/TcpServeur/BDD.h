#pragma once

#include <QObject>
#include <QtSql/QtSql>

class BDD : public QObject
{

	Q_OBJECT

private:
	QSqlDatabase * bdd;

public:

	BDD( );
	
	void EraseAffaire(int Affaire);
	void UpdateAffaire(int Affaire, int Capteur, int Frequence, int TempAcquisition);
	void AddAffaire();
	
	void ConnectToBDD( QString Adresse, QString Username, QString Mdp );
	
};


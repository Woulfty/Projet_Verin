#pragma once

#include <QtWidgets/QMainWindow>
#include <iostream>
#include <QTcpSocket>
#include <QJsonDocument>
#include <QJsonObject>
#include <QString>
#include <string>
#include <QMap>
#include <QTimer>


#include "ui_PosteBanc.h"
#include "Affaire.h"
#include "Arduino.h"

class PosteBanc : public QMainWindow
{
    Q_OBJECT

public:
    PosteBanc(QWidget *parent = Q_NULLPTR);
	Affaire * affaire = new Affaire(0, 1, 0, 0);
	Arduino arduino;
	
	


	QTimer * Frequence;
	QTimer * TempAcquisition;
	

private:
    Ui::PosteBancClass ui;
	QTcpSocket * socket;


public slots:

	void ConnectServeur();
	void onSocketConnected();
	void onSocketDeconnected();
	void onSocketReadyRead();

	void ChangeValueIHM();
	
	void EnableChangeValue();
	void ChangeValueAffaire();
	void DeleteAffaire();
	
	void StartRead();
	void Mesure();
	void SendData();
	void StopTimer();

	
};

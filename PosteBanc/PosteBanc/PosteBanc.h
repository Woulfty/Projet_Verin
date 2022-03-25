#pragma once

#include <QtWidgets/QMainWindow>
#include <iostream>
#include <QTcpSocket>
#include <QJsonDocument>
#include <QJsonObject>
#include <QString>
#include <string>


#include "ui_PosteBanc.h"
#include "Affaire.h"

class PosteBanc : public QMainWindow
{
    Q_OBJECT

public:
    PosteBanc(QWidget *parent = Q_NULLPTR);
	Affaire * affaire = new Affaire(1, 1, 10, 100);
	
	void ChangeValueIHM();
	

private:
    Ui::PosteBancClass ui;
	QTcpSocket * socket;


public slots:

	void ConnectServeur();
	void onSocketConnected();
	void onSocketDeconnected();
	void onSocketReadyRead();

	
	
	void EnableChangeValue();
	void ChangeValueAffaire();
	void DeleteAffaire();
	
	void onButtonClickedSendMessage();
	
};

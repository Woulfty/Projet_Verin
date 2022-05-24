#pragma once

#include <QObject>
#include <iostream>
#include <QTcpSocket>

#include <QJsonDocument>
#include <QJsonObject>
#include "Arduino.h"

class Arduino : public QObject
{
	Q_OBJECT

public:
	Arduino(QObject *parent = Q_NULLPTR);
	~Arduino();

	QList<float> ListValueEntre;
	QList<float> ListValueSortie;

private:
	QTcpSocket * ArduinoSocket = new QTcpSocket( this );

public slots:
	void ArduinoConnexion();
	void ArduinoConnected();
	void ArduinoDisconnected();

	void ArduinoSendRequest();
	void StopConnection();

	void ArduinoReceiveData();

	
	float getValueEntre(int);
	float getValueSortie(int);
	int	  getListSize();
	
};


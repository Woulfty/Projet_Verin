#pragma once

#include <QObject>
#include <iostream>
#include <QTcpSocket>
#include <QList>
#include <QTimer>

#include <windows.h>
#include "Arduino.h"

class Arduino : public QObject
{
	Q_OBJECT

public:
	Arduino(QObject *parent = Q_NULLPTR);
	~Arduino();

	QList<float> ListValueEntre;
	QList<float> ListValueSortie;
	QList<float> ListDebit;

	QTimer * TimerNewSocket;

private:
	QTcpSocket * ArduinoSocket = new QTcpSocket( this );

public slots:
	void ArduinoConnexion();
	void ArduinoConnected();
	void ArduinoDisconnected();

	void ArduinoSendRequest();
	void StopConnection();
	void CreateNewSocket();

	void ArduinoReceiveData();

	
	float getValueEntre(int);
	float getValueSortie(int);
	float getDebit(int);
	int	  getListSize();
	
};


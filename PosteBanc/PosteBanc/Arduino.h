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

	// Liste contenant les valeurs de test
	QList<float> ListValueEntre;
	QList<float> ListValueSortie;
	QList<float> ListDebit;

	QTimer * TimerNewSocket;

private:
	QTcpSocket * ArduinoSocket = new QTcpSocket( this );

public slots:
	// Slot connexion avec l'arduino
	void ArduinoConnexion();
	void ArduinoConnected();
	void ArduinoDisconnected();

	// Slot communication avec l'arduino
	void ArduinoSendRequest();
	void StopConnection();
	void CreateNewSocket();

	// Slot lecture des valeurs
	void ArduinoReceiveData();

	// Setteur des valeurs de test
	float getValueEntre(int);
	float getValueSortie(int);
	float getDebit(int);
	int	  getListSize();
	
};


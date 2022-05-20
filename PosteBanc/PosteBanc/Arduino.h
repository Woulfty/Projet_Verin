#pragma once

#include <QObject>
#include <iostream>
#include <QTcpSocket>

#include <QJsonDocument>
#include <QJsonObject>

class Arduino : public QObject
{
	Q_OBJECT

public:
	Arduino(QObject *parent = Q_NULLPTR);
	~Arduino();

	QMap<float, float> Value;

private:
	QTcpSocket * ArduinoSocket = new QTcpSocket( this );

public slots:
	void ArduinoConnexion();
	void ArduinoConnected();
	void ArduinoDisconnected();

	void ArduinoSendRequest();
	void StopConnection();

	void ArduinoReceiveData();

	float getValueEntre();
	float getValueSortie();
};


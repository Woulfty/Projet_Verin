#include "Arduino.h"
Arduino::Arduino(QObject *parent)
	: QObject(parent)
{

}

Arduino::~Arduino()
{

}

void Arduino::ArduinoConnected() {
	connect(ArduinoSocket, SIGNAL(readyRead()), this, SLOT(ArduinoReceiveData()));
	connect(ArduinoSocket, SIGNAL(disconnected()), this, SLOT(arduinoDisconnected()));
	qDebug() << "Arduino connectee";
}

void Arduino::ArduinoConnexion()
{
	QString ipArduino = "192.168.65.249";
	int portArduino = 50660;
	ArduinoSocket->connectToHost(ipArduino, portArduino);

	connect(ArduinoSocket, SIGNAL(connected()), this, SLOT(ArduinoConnected()));
}

void Arduino::ArduinoDisconnected()
{
	ArduinoSocket->deleteLater();
	qDebug() << "Arduino Deconnectee";
}

/*---------------------------------------------------------------------------------------------------------------*/

void Arduino::ArduinoSendRequest()
{
	if (ArduinoSocket->state() == QTcpSocket::ConnectedState) {

		ArduinoSocket->write("1");

	}
}

void Arduino::StopConnection()
{
	ArduinoSocket->write(0);

	QTcpSocket * ArduinoSocket = new QTcpSocket(this);
}

/*---------------------------------------------------------------------------------------------------------------*/

void Arduino::ArduinoReceiveData()
{
	
	QString Data = ArduinoSocket->read(ArduinoSocket->bytesAvailable());
	QStringList ArduinoValue = Data.split(QLatin1Char(';'), Qt::SkipEmptyParts);


	float ValueEntre = ArduinoValue[0].toFloat();
	float ValueSortie = ArduinoValue[1].toFloat();

	Value.insert(ValueEntre, ValueSortie);
}

/*---------------------------------------------------------------------------------------------------------------*/

float Arduino::getValueEntre(int NumValeurEntre)
{
	float ValueEntre = Value.key(0);
	return ValueEntre;
}

float Arduino::getValueSortie(int NumValeurSortie)
{
	float ValueSortie = Value.key(0);
	return ValueSortie;
}

int Arduino::getMapSize()
{
	int MapSize = Value.size();
	qDebug() << MapSize;
	return MapSize;
}

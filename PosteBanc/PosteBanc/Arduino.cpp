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
	int portArduino = 50630;
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

	ArduinoSocket->write("1");

}

void Arduino::StopConnection()
{
	ArduinoSocket->write("0");

	//QTcpSocket * ArduinoSocket = new QTcpSocket(this);
}

/*---------------------------------------------------------------------------------------------------------------*/

void Arduino::ArduinoReceiveData()
{
	
	QString Data = ArduinoSocket->read(ArduinoSocket->bytesAvailable());
	QStringList ArduinoValue = Data.split(QLatin1Char(','), Qt::SkipEmptyParts);


	float ValueEntre = ArduinoValue[0].toFloat();
	float ValueSortie = ArduinoValue[1].toFloat();

	qDebug() << ValueEntre;
	qDebug() << ValueSortie;

	ListValueEntre.push_back(ValueEntre);
	ListValueSortie.push_back(ValueSortie);
}

/*---------------------------------------------------------------------------------------------------------------*/


float Arduino::getValueEntre(int NumValeurEntre)
{
	float ValueEntre = ListValueEntre.at(NumValeurEntre);
	return ValueEntre;
}

float Arduino::getValueSortie(int NumValeurSortie)
{
	float ValueSortie = ListValueSortie.at(NumValeurSortie);
	return ValueSortie;
}

int Arduino::getListSize()
{
	int ListSize = ListValueEntre.size();
	qDebug() << ListSize;
	return ListSize;
}

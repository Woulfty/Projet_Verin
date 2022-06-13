#include "Arduino.h"

Arduino::Arduino(QObject *parent) : QObject( parent ) {

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
	//Conexion a l'arduino
	QString ipArduino = "192.168.65.249";
	int portArduino = 50630;
	ArduinoSocket->connectToHost(ipArduino, portArduino);

	connect(ArduinoSocket, SIGNAL(connected()), this, SLOT(ArduinoConnected()));
}

void Arduino::ArduinoDisconnected()
{
	ArduinoSocket->deleteLater();
	ArduinoSocket = new QTcpSocket(this);
	qDebug() << "Arduino Deconnectee";
}

/*---------------------------------------------------------------------------------------------------------------*/

void Arduino::ArduinoSendRequest()
{
	// Request d'envoie des valeur
	ArduinoSocket->write("1");

}

void Arduino::StopConnection()
{
	ArduinoSocket->write("0");

	TimerNewSocket = new QTimer(this);
	QObject::connect(TimerNewSocket, SIGNAL(timeout()), this, SLOT(CreateNewSocket()));
	TimerNewSocket->start(1000);
}

void Arduino::CreateNewSocket()
{
	TimerNewSocket->stop();

	ArduinoSocket->deleteLater();
	ArduinoSocket = new QTcpSocket(this);
}

/*---------------------------------------------------------------------------------------------------------------*/

void Arduino::ArduinoReceiveData()
{
	// Parsing des valeur d'entré et sortie
	QString Data = ArduinoSocket->read(ArduinoSocket->bytesAvailable());
	QStringList ArduinoValue = Data.split(QLatin1Char(','), Qt::SkipEmptyParts);

	// Association des valeurs de la liste
	float ValueEntre = ArduinoValue[0].toFloat();
	float ValueSortie = ArduinoValue[1].toFloat();
	float Debit = ArduinoValue[2].toFloat();

	qDebug() << ValueEntre;
	qDebug() << ValueSortie;
	qDebug() << Debit;

	// postebanc->updateGraph(ValueEntre, ValueSortie);

	// Valeur placer dans une liste chacune
	ListValueEntre.push_back(ValueEntre);
	ListValueSortie.push_back(ValueSortie);
	ListDebit.push_back(Debit);
}

/*---------------------------------------------------------------------------------------------------------------*/


float Arduino::getValueEntre(int NumValeurEntre)
{
	//Acceseur Valeur
	float ValueEntre = ListValueEntre.at(NumValeurEntre);
	return ValueEntre;
}

float Arduino::getValueSortie(int NumValeurSortie)
{
	//Acceseur Valeur
	float ValueSortie = ListValueSortie.at(NumValeurSortie);
	return ValueSortie;
}

float Arduino::getDebit(int NumDebit)
{
	//Acceseur Debit
	float ValueDebit = ListDebit.at(NumDebit);
	return ValueDebit;
}

int Arduino::getListSize()
{
	//Acceseur Taile du Tableaux
	int ListSize = ListValueEntre.size();
	qDebug() << ListSize;
	return ListSize;
}

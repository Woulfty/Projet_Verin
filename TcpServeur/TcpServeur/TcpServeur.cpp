#include "TcpServeur.h"

TcpServeur::TcpServeur(QWidget *parent)
    : QMainWindow(parent)
{
    ui.setupUi(this);

	server = new QTcpServer(this);

	QObject::connect(server, SIGNAL(newConnection()), this, SLOT(onServerNewConnection()));
	server->listen(QHostAddress::AnyIPv4, 23);
}

void TcpServeur::onServerNewConnection()
{
	ui.label->setText("Le client est connecté");
	QTcpSocket * client = server->nextPendingConnection();
	QObject::connect(client, SIGNAL(readyRead()), this, SLOT(onClientReadyRead()));
	QObject::connect(client, SIGNAL(disconnect()), this, SLOT(onClientDisconnected()));

	//this->tcpclient.push_back(client);
	//qDebug() << tcpclient;
}

void TcpServeur::onClientReadyRead()
{
	QTcpSocket * obj = qobject_cast<QTcpSocket*>(sender());

	QByteArray data = obj->read(obj->bytesAvailable());
	QString str(data);
	ui.label_2->setText(data);
}

void TcpServeur::onClientDisconnected()
{

}

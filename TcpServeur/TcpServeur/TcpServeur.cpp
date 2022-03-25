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
	ui.LabelBanc->setText("Connected");
	QTcpSocket * client = server->nextPendingConnection();
	QObject::connect(client, SIGNAL(readyRead()), this, SLOT(onClientReadyRead()));
	QObject::connect(client, SIGNAL(disconnect()), this, SLOT(onClientDisconnected()));
}

void TcpServeur::onClientReadyRead()
{
	QTcpSocket * obj = qobject_cast<QTcpSocket*>(sender());
	QByteArray data = obj->read(obj->bytesAvailable());


	QJsonDocument jsonResponse = QJsonDocument::fromJson(data);
	QJsonObject jsonObject = jsonResponse.object();


	int TypeMessage = jsonObject.value("Type").toInt();

	switch (TypeMessage)
	{
	case 1:
		int Affaire = jsonObject.value("affaire").toInt();
		//BDD->EraseAffaire(int Affaire);

		break;
	}
	
}

void TcpServeur::onClientDisconnected()
{
	ui.LabelBanc->setText("Disconected");
}

void TcpServeur::ConnectToBDD()
{
	QString Adresse = ui.AdresseBDD->text();
	QString Username = ui.Username->text();
	QString Mdp = ui.MDP->text();

	qDebug() << Adresse << Username << Mdp;

	bdd = new BDD();
	bdd->ConnectToBDD(Adresse, Username, Mdp);
}

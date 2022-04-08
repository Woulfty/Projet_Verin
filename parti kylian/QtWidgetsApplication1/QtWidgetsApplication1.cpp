#include "QtWidgetsApplication1.h"


QtWidgetsApplication1::QtWidgetsApplication1(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
	ui.disconectpushButton->setVisible(false);
	QString ip = "192.168.65.20";
	QString nameDate = "Verin";
	QString loginData = "admin";
	QString MdpData = "admin";
	ui.labelclientConnectToServer->setText("client connect : " + ClientConnectoServerToQString);
	Affaire = new affaire(ip, nameDate, loginData, MdpData);
	//---------------------------CLIENT------------------------------------------------------------------------------------------------
	tcpSocket = new QTcpSocket(this);
	QObject::connect(tcpSocket, SIGNAL(connected()), this, SLOT(TCPConnected()));
	QObject::connect(tcpSocket, SIGNAL(disconnected()), this, SLOT(TCPdisconnected()));
	QObject::connect(tcpSocket, SIGNAL(readyRead()), this, SLOT(TCPdataread()));
	//---------------------------SERVEUR------------------------------------------------------------------------------------------------
	server = new QTcpServer(this);
	QObject::connect(server, SIGNAL(newConnection()), this, SLOT(onServerNewConnection()));
	server->listen(QHostAddress::AnyIPv4, 4000);

	this->TCPConnected();
}

//quand on click sur le bouton pour se connecter au tcp serveur
void QtWidgetsApplication1::connectTCP()
{
	QString ip = ui.IPlineEdit->text();
	int port = ui.PORtlineEdit->text().toInt();
	//QString port = ui.PORtlineEdit->text();
	tcpSocket->connectToHost(ip, port);
}

//quand on est connecter au tcp serveur
void QtWidgetsApplication1::TCPConnected() {
	ui.connectpushButton->setVisible(false);
	ui.slectefile->setEnabled(true);
	ui.disconectpushButton->setVisible(true);
}

//quand on click sur le bouton pour se déconecter du tcp serveur
void QtWidgetsApplication1::TCPdisconnected()
{
	tcpSocket->disconnectFromHost();
	ui.connectpushButton->setVisible(true);
	ui.slectefile->setEnabled(false);
	ui.disconectpushButton->setVisible(false);
	ui.lineEdit->setText("");
	ui.confDcodage->setEnabled(false);
}

//lire se que on resoi
void QtWidgetsApplication1::TCPdataread()
{
	QByteArray data = tcpSocket->read(tcpSocket->bytesAvailable());
	QString str(data);
	ui.labelAffiche->setText(str);

}

//quand on click sur le bouton pour selectionner une fichier
void QtWidgetsApplication1::selectFileButtonclicked() {
	qDebug() << "test";
	m_fileName = QFileDialog::getOpenFileName(this);
	ui.lineEdit->setText(m_fileName);
	if (m_fileName != NULL) {
		ui.confDcodage->setEnabled(true);
	}
	else {
		ui.confDcodage->setEnabled(false);
	}
}

//quand on click sur le bouton pour lancer le décodage du fichier
void QtWidgetsApplication1::confDecodageFichier()
{
	txt = m_fileName.section('.', 1, 1);
	if (txt == "txt") {
		QFile file(m_fileName);
		if (!file.open(QIODevice::ReadOnly | QIODevice::Text))
		{
			qDebug() << "error lors de l'ouverture du fichier";
		}
		else {
			QString data;
			QTextStream in(&file);
			while (!in.atEnd()) {
				data = in.readLine();
				in << data;
			}
			file.close();
			ui.labelAffiche->setText(data);
			qDebug() << m_fileName.section('.', 1, 1);
			this->TypeAffaire = data.section(';', 0, 0);
			this->IDCapteur = data.section(';', 1, 1);
			this->TotalTime = data.section(';', 2, 2);
			this->Frequence = data.section(';', 3, 3);
			this->Pv = data.section(';', 4, 4);

			qDebug() << this->TypeAffaire;
			qDebug() << this->IDCapteur;
			qDebug() << this->TotalTime;
			qDebug() << this->Frequence;
			qDebug() << this->Pv;

			this->IdAffaire = Affaire->selectAffaire();
			QString json = "{\"affaire\":5, \"capteur\":4, \"frequence\":900, \"temp\":10}";
			//QString json = "{\"affaire\":" + QString::number(TypeAffaire) + ", \"capteur\":1, \"frequence\":900, \"temp\":10}";

			if(ClientConnectoServerToInt != 0){
				client->write(json.toLatin1());
			}
			//tcpSocket->write(json.toLatin1());
		}

	}else{
		ui.labelAffiche->setText("erreur le fichier selectionner c'est pas un fichier en .txt c'est un fichier en ." + txt);
	}

}


void QtWidgetsApplication1::onServerNewConnection()
{
	client = server->nextPendingConnection();
	qDebug() << client;
	QObject::connect(client, SIGNAL(readyRead()), this, SLOT(onclientReadyRead()));
	QObject::connect(client, SIGNAL(disconnected()), this, SLOT(onClientDisconnected()));
	client->write("connected");

	ClientConnectoServerToInt++;
	qDebug() << "client tcp c'est connecter au serveur";
	ClientConnectoServerToQString = QString::number(ClientConnectoServerToInt);
	ui.labelclientConnectToServer->setText("client connect : " + ClientConnectoServerToQString);

}
void QtWidgetsApplication1::onClientDisconnected() {
	ClientConnectoServerToInt--;
	qDebug() << "client tcp c'est deconecter du serveur";
	QTcpSocket * odj = qobject_cast<QTcpSocket*>(sender());
	QObject::disconnect(odj, SIGNAL(readyRead()), this, SLOT(onclientReadyRead()));
	QObject::disconnect(odj, SIGNAL(disconnected()), this, SLOT(onClientDisconnected()));
	odj->deleteLater();

	ClientConnectoServerToQString = QString::number(ClientConnectoServerToInt);
	ui.labelclientConnectToServer->setText("client connect : " + ClientConnectoServerToQString);
}

void QtWidgetsApplication1::onclientReadyRead()
{
	QTcpSocket * odj = qobject_cast<QTcpSocket*>(sender());
	QByteArray data = odj->read(odj->bytesAvailable());
	QString str(data);
	ui.labelAffiche->setText(str);
	qDebug() << "le message recu est : " + str;
	//odj->write(data);

	qDebug() << str.section(':', 1, 1);
	QString methode = str.section(':', 1, 1);
	methode = methode.section(',', 0, 0);
	qDebug() << "methode" +methode;

	if (methode == QString::number(2)) {
		QString id = str.section(':', 2, 2);
		id = id.section(',', 0, 0);
		id = id.section('}', 0, 0);
		qDebug() << id;
		Affaire->deleteAffaire(id);
	}
	else if (methode == QString::number(3))
	{
		QString id = str.section(':', 2, 2);
		id = id.section(',', 0, 0);
		this->IDCapteur = str.section(':', 3, 3);
		this->IDCapteur = IDCapteur.section(',', 0, 0);
		this->Frequence = str.section(':', 4, 4);
		this->Frequence = this->Frequence.section(',', 0, 0);
		this->TotalTime = str.section(':', 5, 5);
		this->TotalTime = this->TotalTime.section(',', 0, 0);
		this->TotalTime = this->TotalTime.section('}', 0, 0);
		qDebug() << "l'id de la methode 3 " + id;
		qDebug() << "l'idcpateur de la methode 3 " + IDCapteur;
		qDebug() << "frequence " + this->Frequence;
		qDebug() << "totalTime " + this->TotalTime;

		Affaire->updateAffaire(id,this->IDCapteur, this->TotalTime, this->Frequence);
	}
	
}



#include "PosteBanc.h"

#include <qDebug>

PosteBanc::PosteBanc(QWidget *parent)
    : QMainWindow(parent)
{
    ui.setupUi(this);
	socket = new QTcpSocket(this);

	QObject::connect(socket, SIGNAL(connected()), this, SLOT(onSocketConnected()));

	
}

void PosteBanc::ConnectServeur()
{
	QString ip = ui.AdresseServ->text();
	QString port = ui.PortServ->text();

	bool ok;
	int portAsInt = port.toInt(&ok);
	if (ok)
	{
		socket->connectToHost(ip, portAsInt);
	}
}

void PosteBanc::onSocketConnected()
{
	ui.ConnexionServeur->setEnabled(false);
	ui.InformationTest->setEnabled(true);

	QObject::connect(socket, SIGNAL(disconnected()), this, SLOT(onSocketDeconnected()));
	QObject::connect(socket, SIGNAL(readyRead()), this, SLOT(onSocketReadyRead()));
}

void PosteBanc::onSocketDeconnected()
{
	ui.ConnexionServeur->setEnabled(true);
	ui.InformationTest->setEnabled(false);
}

void PosteBanc::onSocketReadyRead()
{
	
	QByteArray data = socket->read(socket->bytesAvailable());
	QJsonDocument jsonResponse = QJsonDocument::fromJson(data);
	QJsonObject jsonObject = jsonResponse.object();
	

	int NumAffaire = jsonObject.value("affaire").toInt();
	int Capteur = jsonObject.value("capteur").toInt();
	int Frequence = jsonObject.value("frequence").toInt();
	int TempAcquisition = jsonObject.value("temp").toInt();


	affaire->setValueAffaire(NumAffaire, Capteur, Frequence, TempAcquisition);

	ChangeValueIHM();

	ui.CancelAffaire->setEnabled(true);
	ui.ChangeValueAffaire->setEnabled(true);

	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);
}

/*---------------------------------------------------------------------------------------------------------------*/

void PosteBanc::EnableChangeValue()
{
	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
	ui.CapteurLine->setEnabled(true);
	ui.FrequenceLine->setEnabled(true);
	ui.tempAcquisitionLine->setEnabled(true);
	ui.ValideNewParemetre->setEnabled(true);
}

void PosteBanc::ChangeValueAffaire()
{

	//int NewValueAffaire = ui.AffaireLine->text().toInt();
	int NewValueCapteur = ui.CapteurLine->text().toInt();
	int NewValueFrequence = ui.FrequenceLine->text().toInt();
	int NewValueTempAcquisition = ui.tempAcquisitionLine->text().toInt();

	int NumAffaire = affaire->getNumAffaire();
	QString AffaireUpdateJSON = affaire->JSONupdate(NumAffaire, NewValueCapteur, NewValueFrequence, NewValueTempAcquisition);

	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(AffaireUpdateJSON.toLatin1());

	}

	affaire->setValueAffaire(NumAffaire, NewValueCapteur, NewValueFrequence, NewValueTempAcquisition);
	ChangeValueIHM();

	ui.ValideNewParemetre->setEnabled(false);

	ui.CancelAffaire->setEnabled(true);
	ui.ChangeValueAffaire->setEnabled(true);
	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);

}

void PosteBanc::ChangeValueIHM()
{
	
	int Affaire = this->affaire->getNumAffaire();
	int Capteur = this->affaire->getCapteur();
	int Frequence = this->affaire->getFrequence();
	int TempAcquisition = this->affaire->getTempAcquisition();

	ui.LabelAffaire->setText(QString::number(Affaire));
	ui.LabelCapteur->setText(QString::number(Capteur));
	ui.LabelFrequence->setText(QString::number(Frequence));
	ui.LabelAcquisition->setText(QString::number(TempAcquisition));
	
}

void PosteBanc::DeleteAffaire()
{
	int NumAffaireDelete = affaire->getNumAffaire();
	QString AffaireDeleteJSON = affaire->JSONdelete(NumAffaireDelete);

	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(AffaireDeleteJSON.toLatin1());

	}

	this->affaire = new Affaire(0, 0, 0, 0);

	ChangeValueIHM();

	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
}

/*---------------------------------------------------------------------------------------------------------------*/



void PosteBanc::StartRead()
{
	ui.ConnexionServeur->setEnabled(false);
	ui.InformationTest->setEnabled(false);

	int FrequenceLecture = this->affaire->getFrequence();
	int TempAcquisitionLecture = this->affaire->getTempAcquisition();
	int TempAcquisitionLectureSecond = TempAcquisitionLecture * 1000;

	arduino.ArduinoConnexion();

	Frequence = new QTimer(this);
	QObject::connect(Frequence, SIGNAL(timeout()), this, SLOT(Mesure()));
	Frequence->start(FrequenceLecture);

	TempAcquisition = new QTimer(this);
	QObject::connect(TempAcquisition, SIGNAL(timeout()), this, SLOT(StopTimer()));
	TempAcquisition->start(TempAcquisitionLectureSecond);
}

void PosteBanc::Mesure()
{
	arduino.ArduinoSendRequest();
}



void PosteBanc::SendData()
{

	QString Affaire = affaire->CreateJSON();
	qDebug() << Affaire;

	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(Affaire.toLatin1());

	}
}

void PosteBanc::StopTimer()
{
	Frequence->stop();
	TempAcquisition->stop();
	qDebug() << "End Timer";

	arduino.StopConnection();
	SendData();

	ui.ConnexionServeur->setEnabled(true);
	ui.InformationTest->setEnabled(true);
}


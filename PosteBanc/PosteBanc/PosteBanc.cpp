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

	ui.AffaireLine->setEnabled(false);
	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);
}

/*---------------------------------------------------------------------------------------------------------------*/

void PosteBanc::EnableChangeValue()
{
	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
	ui.AffaireLine->setEnabled(true);
	ui.CapteurLine->setEnabled(true);
	ui.FrequenceLine->setEnabled(true);
	ui.tempAcquisitionLine->setEnabled(true);
	ui.ValideNewParemetre->setEnabled(true);
}

void PosteBanc::ChangeValueAffaire()
{

	int NewValueAffaire = ui.AffaireLine->text().toInt();
	int NewValueCapteur = ui.CapteurLine->text().toInt();
	int NewValueFrequence = ui.FrequenceLine->text().toInt();
	int NewValueTempAcquisition = ui.tempAcquisitionLine->text().toInt();

	affaire->setValueAffaire(NewValueAffaire, NewValueCapteur, NewValueFrequence, NewValueTempAcquisition);
	ChangeValueIHM();

	ui.ValideNewParemetre->setEnabled(false);

	ui.CancelAffaire->setEnabled(true);
	ui.ChangeValueAffaire->setEnabled(true);
	ui.AffaireLine->setEnabled(false);
	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);

}

void PosteBanc::ChangeValueIHM()
{
	
	int Affaire = affaire->getNumAffaire();
	int Capteur = affaire->getCapteur();
	int Frequence = affaire->getFrequence();
	int TempAcquisition = affaire->getTempAcquisition();


	ui.LabelAffaire->setText(QString::number(Affaire));
	ui.LabelCapteur->setText(QString::number(Capteur));
	ui.LabelFrequence->setText(QString::number(Frequence));
	ui.LabelAcquisition->setText(QString::number(TempAcquisition));
	
}

void PosteBanc::DeleteAffaire()
{
	affaire = new Affaire(1, 1, 10, 1000);
	ChangeValueIHM();
}

/*---------------------------------------------------------------------------------------------------------------*/

void PosteBanc::onButtonClickedSendMessage()
{

	QString Affaire = affaire->CreateJSON();
	qDebug() << Affaire;

	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(Affaire.toLatin1());

	}
}




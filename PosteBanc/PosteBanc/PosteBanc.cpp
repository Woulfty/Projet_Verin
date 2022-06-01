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
	
	socket->connectToHost(ip, portAsInt);

	// Si le serveur ne répond pas on affiche un message d'érreur
	if (!socket->waitForConnected(5000))
	{
		ui.ErreurServeur->setText("Can't connect to server");
	}
}

void PosteBanc::onSocketConnected()
{
	ui.ConnexionServeur->setEnabled(false);
	ui.InformationTest->setEnabled(true);
	ui.ErreurServeur->setText("");

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
	// On lit le message reçue et découpe les informations pour les exploiter
	QByteArray data = socket->read(socket->bytesAvailable());
	QJsonDocument jsonResponse = QJsonDocument::fromJson(data);
	QJsonObject jsonObject = jsonResponse.object();
	
	// On extrait Les valeur et on les place dans variable
	int NumAffaire = jsonObject.value("affaire").toInt();
	int Capteur = jsonObject.value("capteur").toInt();
	int Frequence = jsonObject.value("frequence").toInt();
	int TempAcquisition = jsonObject.value("temp").toInt();

	// Utilisation d'un setteur pour stocker les paramètre
	affaire->setValueAffaire(NumAffaire, Capteur, Frequence, TempAcquisition);

	// Modification de l'IHM
	ChangeValueIHM();

	ui.CancelAffaire->setEnabled(true);
	ui.ChangeValueAffaire->setEnabled(true);
	ui.BouttonAffaire->setEnabled(true);

	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);
}

/*---------------------------------------------------------------------------------------------------------------*/

void PosteBanc::EnableChangeValue()
{
	// Modification de l'ihm pour modifier les paramètres
	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
	ui.BouttonAffaire->setEnabled(false);
	ui.CapteurLine->setEnabled(true);
	ui.FrequenceLine->setEnabled(true);
	ui.tempAcquisitionLine->setEnabled(true);
	ui.ValideNewParemetre->setEnabled(true);
}

void PosteBanc::ChangeValueAffaire()
{
	int NewValueCapteur = ui.CapteurLine->text().toInt();
	int NewValueFrequence = ui.FrequenceLine->text().toInt();
	int NewValueTempAcquisition = ui.tempAcquisitionLine->text().toInt();

	int NumAffaire = affaire->getNumAffaire();
	
	//
	QString AffaireUpdateJSON = affaire->JSONupdate(NumAffaire, NewValueCapteur, NewValueFrequence, NewValueTempAcquisition);

	//Envoie nouveaux paramètre a BDD pour la modifier
	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(AffaireUpdateJSON.toLatin1());

	}

	// Setteur pour changer les paramètre
	affaire->setValueAffaire(NumAffaire, NewValueCapteur, NewValueFrequence, NewValueTempAcquisition);
	ChangeValueIHM();

	ui.ValideNewParemetre->setEnabled(false);

	ui.CancelAffaire->setEnabled(true);
	ui.ChangeValueAffaire->setEnabled(true);
	ui.BouttonAffaire->setEnabled(true);
	ui.CapteurLine->setEnabled(false);
	ui.FrequenceLine->setEnabled(false);
	ui.tempAcquisitionLine->setEnabled(false);

}

void PosteBanc::ChangeValueIHM()
{
	// Modification IHM pour nouveaux paramètre
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

	// Envoie a la BDD pour supression de l'affaire
	if (socket->state() == QTcpSocket::ConnectedState) {

		socket->write(AffaireDeleteJSON.toLatin1());

	}

	this->affaire = new Affaire(0, 0, 0, 0);

	ChangeValueIHM();

	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
	ui.BouttonAffaire->setEnabled(false);
}

/*---------------------------------------------------------------------------------------------------------------*/



void PosteBanc::StartRead()
{
	ui.ConnexionServeur->setEnabled(false);
	ui.InformationTest->setEnabled(false);

	//Récupération paramètres
	int FrequenceLecture = this->affaire->getFrequence();
	int TempAcquisitionLecture = this->affaire->getTempAcquisition();
	int TempAcquisitionLectureSecond = TempAcquisitionLecture * 1000 + FrequenceLecture;

	arduino.ArduinoConnexion();
	
	//Timer de Fréquence
	Frequence = new QTimer(this);
	QObject::connect(Frequence, SIGNAL(timeout()), this, SLOT(Mesure()));
	Frequence->start(FrequenceLecture);

	//Timer temp total
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
	// Boucle qui parcourt le tableaux de donnée pour tous les envoyer
	int TailleTableau = arduino.getListSize();

	for(int i = 1; i < TailleTableau; i++)
	{ 
		float	ValueEntre = arduino.getValueEntre(i);
		float	ValueSortie = arduino.getValueSortie(i);
		float	ValueDebit = arduino.getDebit(i);
		
		int NumeroEssaieBase = i;
		QString Affaire = affaire->CreateJSON(NumeroEssaieBase, ValueEntre, ValueSortie, ValueDebit);

		if (socket->state() == QTcpSocket::ConnectedState) {

			socket->write(Affaire.toLatin1());

		}
		
	}
	
}

void PosteBanc::StopTimer()
{
	//Fin des timers
	Frequence->stop();
	TempAcquisition->stop();
	qDebug() << "End Timer";

	// Arrêt de la connection arduino et envoie des donnée au serveur
	arduino.StopConnection();
	SendData();

	
	
	this->affaire = new Affaire(0, 0, 0, 0);
	ChangeValueIHM();

	ui.InformationTest->setEnabled(true);

	ui.CancelAffaire->setEnabled(false);
	ui.ChangeValueAffaire->setEnabled(false);
	ui.BouttonAffaire->setEnabled(false);


}
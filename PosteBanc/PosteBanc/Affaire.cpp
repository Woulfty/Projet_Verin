#include "Affaire.h"
Affaire::Affaire(int NumAffaire, int Capteur, int TempAcquisition, int Frequence) {

	this->NumAffaire = NumAffaire;
	this->Capteur = Capteur;
	this->TempAcquisition = TempAcquisition;
	this->Frequence = Frequence;

	qDebug() << NumAffaire << Capteur << TempAcquisition << Frequence;
}

Affaire::~Affaire()
{

}

void Affaire::setValueAffaire(int NumAffaire, int Capteur, int TempAcquisition, int Frequence)
{
	this->NumAffaire = NumAffaire;
	this->Capteur = Capteur;
	this->TempAcquisition = TempAcquisition;
	this->Frequence = Frequence;
}

QString Affaire::CreateJSON()
{
	QString AffaireJSON = "{\"affaire\":" + QString::number(NumAffaire) + ",\"capteur\":" + QString::number(Capteur) + ",\"frequence\":" + QString::number(Frequence) + ",\"temp\":" + QString::number(TempAcquisition) + "}";

	return AffaireJSON;
}

int Affaire::getNumAffaire()
{
	int Affaire = this->NumAffaire;
	return Affaire;
}

int Affaire::getCapteur()
{
	int Capteur = this->Capteur;
	return Capteur;
}

int Affaire::getFrequence()
{
	int Frequence = this->Frequence;
	return Frequence;
}

int Affaire::getTempAcquisition()
{
	int TempAcquisition = this->TempAcquisition;
	return TempAcquisition;
}

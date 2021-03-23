#include "Affaire.h"
Affaire::Affaire(int NumAffaire, int Capteur, int Frequence, int TempAcquisition) {

	this->NumAffaire = NumAffaire;
	this->Capteur = Capteur;
	this->Frequence = Frequence;
	this->TempAcquisition = TempAcquisition;

}

Affaire::~Affaire()
{

}

void Affaire::setValueAffaire(int NumAffaire, int Capteur, int Frequence, int TempAcquisition)
{
	this->NumAffaire = NumAffaire;
	this->Capteur = Capteur;
	this->TempAcquisition = TempAcquisition;
	this->Frequence = Frequence;
}

QString Affaire::CreateJSON(int NumEssaie, float ValueEntre, float ValueSortie)
{

	QString AffaireJSON = "{\"Methode\":1,\"Affaire\":" + QString::number(NumAffaire) + ",\"capteur\":" + QString::number(Capteur) + ",\"frequence\":" + QString::number(Frequence) + ",\"temp\":" + QString::number(TempAcquisition) + ", \"ValueEntre\":" + QString::number(ValueEntre) + ",\"ValueSortie\":" + QString::number(ValueSortie) + "}";

	return AffaireJSON;
}

QString Affaire::JSONdelete(int NumAffaireDelete)
{
	QString AffaireJSON = "{\"Methode\":2,\"affaire\":" + QString::number(NumAffaireDelete) + "}";

	return AffaireJSON;
}

QString Affaire::JSONupdate(int NumAffaire, int Capteur, int Frequence, int TempAcquisition)
{
	QString AffaireJSON = "{\"Methode\":3,\"Affaire\":" + QString::number(NumAffaire) + ",\"capteur\":" + QString::number(Capteur) + ",\"frequence\":" + QString::number(Frequence) + ",\"temp\":" + QString::number(TempAcquisition) + "}";

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

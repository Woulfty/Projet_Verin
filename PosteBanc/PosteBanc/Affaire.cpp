#include "Affaire.h"
Affaire::Affaire(int NumAffaire, int Capteur, int Frequence, int TempAcquisition) {

	// Change la valeur des variables
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
	// Setteur pour de nouvelle valeur
	this->NumAffaire = NumAffaire;
	this->Capteur = Capteur;
	this->TempAcquisition = TempAcquisition;
	this->Frequence = Frequence;
}

QString Affaire::CreateJSON(int NumEssaie, float ValueEntre, float ValueSortie, float ValueDebit)
{
	float rendement = ValueSortie / ValueEntre; // Calcul Rendement

	//Json de fin d'une affaire : Envoie des valeurs
	QString AffaireJSON = "{\"Methode\":1,\"Affaire\":" + QString::number(NumAffaire) + ",\"NumEssaie\":" + QString::number(NumEssaie) + ", \"Value\":" + QString::number(rendement) + ",\"Debit\":" + QString::number(ValueDebit) + "}";

	return AffaireJSON;
}

QString Affaire::JSONdelete(int NumAffaireDelete)
{
	//JSON d'annulation d'affaire
	QString AffaireJSON = "{\"Methode\":2,\"affaire\":" + QString::number(NumAffaireDelete) + "}";

	return AffaireJSON;
}

QString Affaire::JSONupdate(int NumAffaire, int Capteur, int Frequence, int TempAcquisition)
{
	//JSON modification d'affaire	
	QString AffaireJSON = "{\"Methode\":3,\"Affaire\":" + QString::number(NumAffaire) + ",\"capteur\":" + QString::number(Capteur) + ",\"frequence\":" + QString::number(Frequence) + ",\"temp\":" + QString::number(TempAcquisition) + "}";

	return AffaireJSON;
}

int Affaire::getNumAffaire()
{
	// Setteur Affaire
	int Affaire = this->NumAffaire;
	return Affaire;
}

int Affaire::getCapteur()
{
	// Setteur Capteur
	int Capteur = this->Capteur;
	return Capteur;
}

int Affaire::getFrequence()
{
	// Setteur Fréquence
	int Frequence = this->Frequence;
	return Frequence;
}

int Affaire::getTempAcquisition()
{
	// Setteur Temp Acquisition
	int TempAcquisition = this->TempAcquisition;
	return TempAcquisition;
}

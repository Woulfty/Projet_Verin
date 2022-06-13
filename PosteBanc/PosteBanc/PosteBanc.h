#pragma once


#include <QtWidgets/QMainWindow>
#include <iostream>
#include <QTcpSocket>
#include <QJsonDocument>
#include <QJsonObject>
#include <QString>
#include <string>
#include <QTimer>
#include <QPen>
#include <Windows.h>

#include <QtCharts>
#include <QtCharts/QLineSeries>
#include <qchartview.h>

#include "ui_PosteBanc.h"
#include "Affaire.h"
#include "Arduino.h"

class PosteBanc : public QMainWindow
{
    Q_OBJECT

public:
    PosteBanc(QWidget *parent = Q_NULLPTR);
	Affaire * affaire = new Affaire(0, 1, 0, 0);
	Arduino arduino;
	

	QTimer * Frequence;
	QTimer * TempAcquisition;

	

	Ui::PosteBancClass ui;

private:
	QTcpSocket * socket;

	QChart * chart;
	QChartView * Graph;

	QLineSeries * series;

	QCategoryAxis * axisY;
	QCategoryAxis * axisX;

public slots:

	// Slots lié au Serveur
	void ConnectServeur();
	void onSocketConnected();
	void onSocketDeconnected();
	void onSocketReadyRead();

	// Slot IHM valeur
	void ChangeValueIHM();
	
	// Slot IHM Bouton et activation
	void EnableChangeValue();
	void ChangeValueAffaire();
	void DeleteAffaire();
	
	// Slot Démarer l'affaire
	void StartRead();
	void Mesure();
	void SendData();
	void StopTimer();

	// Slot Graphique ( Non Fonctionnel )
	void CreateGraph(int);
};

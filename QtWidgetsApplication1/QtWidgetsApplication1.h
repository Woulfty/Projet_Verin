#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_QtWidgetsApplication1.h"
#include <windows.h>
#include <qdebug.h>
#include <QFile>
#include <QUrl>
#include <QFileDialog>
#include <qtcpsocket.h>
#include "affaire.h"
#include <qtcpserver.h>
#include "essai.h"

class QtWidgetsApplication1 : public QMainWindow
{
	Q_OBJECT

public:
	QtWidgetsApplication1(QWidget *parent = Q_NULLPTR);

private:
	Ui::QtWidgetsApplication1Class ui;
	QTcpSocket * client;
	QString m_fileName;
	QString txt;
	QTcpSocket * tcpSocket;
	QTcpServer * server;
	affaire  *Affaire;
	essai  * Essai;
	QString IdAffaire;
	QString TypeAffaire;
	QString IDCapteur;
	QString TotalTime;
	QString Frequence;
	QString Pv;
	int ClientConnectoServerToInt = 0;
	QString ClientConnectoServerToQString = QString::number(ClientConnectoServerToInt);;
	void reset();
	void selectListAffaire();

private slots:
	void selectFileButtonclicked();
	void confDecodageFichier();
	void test();
	void selectEssai();
	void suppEssai();
	void updateEssai();
	void creatEssai();

	//----------------------Client--------------------------------------------
	void connectTCP();
	void TCPConnected();
	void TCPdisconnected();
	void TCPdataread();
	//-------------------Serveur----------------------------------------------------
	void onServerNewConnection();
	void onClientDisconnected();
	void onclientReadyRead();
};

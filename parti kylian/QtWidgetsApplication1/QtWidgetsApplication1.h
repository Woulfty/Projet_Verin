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
	int IdAffaire;
	int TypeAffaire;
	int IDCapteur;
	float TotalTime;
	float Frequence;
	QString Pv;
	int ClientConnectoServerToInt = 0;
	QString ClientConnectoServerToQString = QString::number(ClientConnectoServerToInt);;

private slots:
	void selectFileButtonclicked();
	void confDecodageFichier();
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

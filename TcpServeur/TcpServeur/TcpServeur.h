#pragma once

#include <QtWidgets/QMainWindow>
#include <QTcpServer>
#include <QTcpSocket>
#include <QList>

#include "ui_TcpServeur.h"
#include "BDD.h"

class TcpServeur : public QMainWindow
{
    Q_OBJECT

public:
    TcpServeur(QWidget *parent = Q_NULLPTR);

private:
    Ui::TcpServeurClass ui;

	BDD * bdd;
	QTcpServer * server;

public slots:
	void onServerNewConnection();
	void onClientReadyRead();
	void onClientDisconnected();

	void ConnectToBDD();
};

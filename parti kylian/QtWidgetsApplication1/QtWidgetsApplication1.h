#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_QtWidgetsApplication1.h"
#include "affaire.h"
#include <windows.h>
#include <qdebug.h>
#include <QFile>
#include <QUrl>
#include <QFileDialog>

class QtWidgetsApplication1 : public QMainWindow
{
    Q_OBJECT

public:
    QtWidgetsApplication1(QWidget *parent = Q_NULLPTR);

private:
    Ui::QtWidgetsApplication1Class ui;
	QString m_fileName;


private slots:
	void selectFileButtonclicked();
};

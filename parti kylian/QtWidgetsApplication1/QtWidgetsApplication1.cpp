#include "QtWidgetsApplication1.h"



QtWidgetsApplication1::QtWidgetsApplication1(QWidget *parent)
    : QMainWindow(parent)
{
    ui.setupUi(this);
}


void QtWidgetsApplication1::selectFileButtonclicked() {
	qDebug() << "test";
	m_fileName = QFileDialog::getOpenFileName(this);
	//test = m_fileName.toStdString().c_str();
	ui.lineEdit->setText(m_fileName);
	if (m_fileName != NULL) {
		ui.confDcodage->setEnabled(true);
	}
	else {
		ui.confDcodage->setEnabled(false);
	}
}

void QtWidgetsApplication1::confDecodageFichier()
{
	QFile file(m_fileName);
	if (!file.open(QIODevice::ReadOnly | QIODevice::Text))
	{ 
		qDebug() << "error lors de l'ouverture du fichier";
	}

	QString data;
	QTextStream in(&file);
	while (!in.atEnd()) {
		 data = in.readLine();
		in << data;
	}
	file.close();
	ui.labelAffiche->setText(data);
}

#include "QtWidgetsApplication1.h"




QtWidgetsApplication1::QtWidgetsApplication1(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
}


void QtWidgetsApplication1::selectFileButtonclicked() {
	qDebug() << "test";
	m_fileName = QFileDialog::getOpenFileName(this);
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
	txt = m_fileName.section('.', 1, 1);
	if (txt == "txt") {
		QFile file(m_fileName);
		if (!file.open(QIODevice::ReadOnly | QIODevice::Text))
		{
			qDebug() << "error lors de l'ouverture du fichier";
		}
		else {
			QString data;
			QTextStream in(&file);
			while (!in.atEnd()) {
				data = in.readLine();
				in << data;
			}
			file.close();
			ui.labelAffiche->setText(data);
			qDebug() << m_fileName.section('.', 1, 1);
			this->TypeAffaire = data.section(';', 0, 0).toInt();
			this->IDCapteur = data.section(';', 1, 1).toInt();
			this->TotalTime = data.section(';', 2, 2).toFloat();
			this->Frequence = data.section(';', 3, 3).toFloat();
			this->Pv = data.section(';', 4, 4);

			qDebug() << this->TypeAffaire;
			qDebug() << this->IDCapteur;
			qDebug() << this->TotalTime;
			qDebug() << this->Frequence;
			qDebug() << this->Pv;
		}

	}
	else
	{
		ui.labelAffiche->setText("erreur le fichier selectionner c'est pas un fichier en .txt c'est un fichier en ." + txt);
	}

}

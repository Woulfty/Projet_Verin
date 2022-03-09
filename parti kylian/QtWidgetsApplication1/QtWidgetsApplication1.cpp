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
}

/********************************************************************************
** Form generated from reading UI file 'PosteBanc.ui'
**
** Created by: Qt User Interface Compiler version 5.14.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_POSTEBANC_H
#define UI_POSTEBANC_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QGroupBox>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_PosteBancClass
{
public:
    QWidget *centralWidget;
    QGroupBox *ConnexionServeur;
    QLabel *label;
    QLabel *label_2;
    QLineEdit *AdresseServ;
    QLineEdit *PortServ;
    QPushButton *ButtonConnect;
    QGroupBox *InformationTest;
    QLabel *TextAffaire;
    QLabel *TextCapteur;
    QLabel *TextFrequence;
    QLabel *TextAcquisition;
    QLabel *LabelAcquisition;
    QLabel *LabelFrequence;
    QLabel *LabelCapteur;
    QLabel *LabelAffaire;
    QPushButton *pushButton;
    QPushButton *CancelAffaire;
    QLineEdit *CapteurLine;
    QLineEdit *FrequenceLine;
    QLineEdit *tempAcquisitionLine;
    QLabel *LabelCapteurNew;
    QLabel *LabelFrequenceNew;
    QLabel *LabelTempAcquisitionNew;
    QPushButton *ChangeValueAffaire;
    QPushButton *ValideNewParemetre;
    QPushButton *pushButton_2;
    QScrollArea *scrollArea;
    QWidget *scrollAreaWidgetContents;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *PosteBancClass)
    {
        if (PosteBancClass->objectName().isEmpty())
            PosteBancClass->setObjectName(QString::fromUtf8("PosteBancClass"));
        PosteBancClass->resize(864, 512);
        centralWidget = new QWidget(PosteBancClass);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        ConnexionServeur = new QGroupBox(centralWidget);
        ConnexionServeur->setObjectName(QString::fromUtf8("ConnexionServeur"));
        ConnexionServeur->setGeometry(QRect(20, 30, 241, 141));
        label = new QLabel(ConnexionServeur);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(10, 20, 110, 20));
        label_2 = new QLabel(ConnexionServeur);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setGeometry(QRect(30, 50, 110, 30));
        AdresseServ = new QLineEdit(ConnexionServeur);
        AdresseServ->setObjectName(QString::fromUtf8("AdresseServ"));
        AdresseServ->setGeometry(QRect(120, 20, 110, 20));
        PortServ = new QLineEdit(ConnexionServeur);
        PortServ->setObjectName(QString::fromUtf8("PortServ"));
        PortServ->setGeometry(QRect(120, 60, 110, 20));
        ButtonConnect = new QPushButton(ConnexionServeur);
        ButtonConnect->setObjectName(QString::fromUtf8("ButtonConnect"));
        ButtonConnect->setGeometry(QRect(60, 90, 120, 30));
        InformationTest = new QGroupBox(centralWidget);
        InformationTest->setObjectName(QString::fromUtf8("InformationTest"));
        InformationTest->setEnabled(false);
        InformationTest->setGeometry(QRect(330, 30, 561, 251));
        TextAffaire = new QLabel(InformationTest);
        TextAffaire->setObjectName(QString::fromUtf8("TextAffaire"));
        TextAffaire->setGeometry(QRect(20, 30, 71, 21));
        TextCapteur = new QLabel(InformationTest);
        TextCapteur->setObjectName(QString::fromUtf8("TextCapteur"));
        TextCapteur->setGeometry(QRect(20, 60, 71, 21));
        TextFrequence = new QLabel(InformationTest);
        TextFrequence->setObjectName(QString::fromUtf8("TextFrequence"));
        TextFrequence->setGeometry(QRect(20, 90, 71, 21));
        TextAcquisition = new QLabel(InformationTest);
        TextAcquisition->setObjectName(QString::fromUtf8("TextAcquisition"));
        TextAcquisition->setGeometry(QRect(20, 120, 111, 21));
        LabelAcquisition = new QLabel(InformationTest);
        LabelAcquisition->setObjectName(QString::fromUtf8("LabelAcquisition"));
        LabelAcquisition->setGeometry(QRect(130, 120, 55, 21));
        LabelFrequence = new QLabel(InformationTest);
        LabelFrequence->setObjectName(QString::fromUtf8("LabelFrequence"));
        LabelFrequence->setGeometry(QRect(130, 90, 55, 21));
        LabelCapteur = new QLabel(InformationTest);
        LabelCapteur->setObjectName(QString::fromUtf8("LabelCapteur"));
        LabelCapteur->setGeometry(QRect(130, 60, 55, 21));
        LabelAffaire = new QLabel(InformationTest);
        LabelAffaire->setObjectName(QString::fromUtf8("LabelAffaire"));
        LabelAffaire->setGeometry(QRect(130, 30, 55, 21));
        pushButton = new QPushButton(InformationTest);
        pushButton->setObjectName(QString::fromUtf8("pushButton"));
        pushButton->setGeometry(QRect(30, 200, 171, 28));
        CancelAffaire = new QPushButton(InformationTest);
        CancelAffaire->setObjectName(QString::fromUtf8("CancelAffaire"));
        CancelAffaire->setEnabled(false);
        CancelAffaire->setGeometry(QRect(60, 160, 111, 28));
        CapteurLine = new QLineEdit(InformationTest);
        CapteurLine->setObjectName(QString::fromUtf8("CapteurLine"));
        CapteurLine->setEnabled(false);
        CapteurLine->setGeometry(QRect(400, 60, 113, 22));
        FrequenceLine = new QLineEdit(InformationTest);
        FrequenceLine->setObjectName(QString::fromUtf8("FrequenceLine"));
        FrequenceLine->setEnabled(false);
        FrequenceLine->setGeometry(QRect(400, 90, 113, 22));
        tempAcquisitionLine = new QLineEdit(InformationTest);
        tempAcquisitionLine->setObjectName(QString::fromUtf8("tempAcquisitionLine"));
        tempAcquisitionLine->setEnabled(false);
        tempAcquisitionLine->setGeometry(QRect(400, 120, 113, 22));
        LabelCapteurNew = new QLabel(InformationTest);
        LabelCapteurNew->setObjectName(QString::fromUtf8("LabelCapteurNew"));
        LabelCapteurNew->setGeometry(QRect(290, 60, 111, 21));
        LabelFrequenceNew = new QLabel(InformationTest);
        LabelFrequenceNew->setObjectName(QString::fromUtf8("LabelFrequenceNew"));
        LabelFrequenceNew->setGeometry(QRect(270, 90, 131, 21));
        LabelTempAcquisitionNew = new QLabel(InformationTest);
        LabelTempAcquisitionNew->setObjectName(QString::fromUtf8("LabelTempAcquisitionNew"));
        LabelTempAcquisitionNew->setGeometry(QRect(240, 120, 161, 21));
        ChangeValueAffaire = new QPushButton(InformationTest);
        ChangeValueAffaire->setObjectName(QString::fromUtf8("ChangeValueAffaire"));
        ChangeValueAffaire->setEnabled(false);
        ChangeValueAffaire->setGeometry(QRect(310, 160, 171, 28));
        ValideNewParemetre = new QPushButton(InformationTest);
        ValideNewParemetre->setObjectName(QString::fromUtf8("ValideNewParemetre"));
        ValideNewParemetre->setEnabled(false);
        ValideNewParemetre->setGeometry(QRect(290, 200, 211, 28));
        pushButton_2 = new QPushButton(centralWidget);
        pushButton_2->setObjectName(QString::fromUtf8("pushButton_2"));
        pushButton_2->setGeometry(QRect(50, 260, 75, 23));
        scrollArea = new QScrollArea(centralWidget);
        scrollArea->setObjectName(QString::fromUtf8("scrollArea"));
        scrollArea->setGeometry(QRect(370, 290, 391, 161));
        scrollArea->setWidgetResizable(true);
        scrollAreaWidgetContents = new QWidget();
        scrollAreaWidgetContents->setObjectName(QString::fromUtf8("scrollAreaWidgetContents"));
        scrollAreaWidgetContents->setGeometry(QRect(0, 0, 389, 159));
        scrollArea->setWidget(scrollAreaWidgetContents);
        PosteBancClass->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(PosteBancClass);
        menuBar->setObjectName(QString::fromUtf8("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 864, 21));
        PosteBancClass->setMenuBar(menuBar);
        mainToolBar = new QToolBar(PosteBancClass);
        mainToolBar->setObjectName(QString::fromUtf8("mainToolBar"));
        PosteBancClass->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(PosteBancClass);
        statusBar->setObjectName(QString::fromUtf8("statusBar"));
        PosteBancClass->setStatusBar(statusBar);

        retranslateUi(PosteBancClass);
        QObject::connect(ButtonConnect, SIGNAL(clicked(bool)), PosteBancClass, SLOT(ConnectServeur()));
        QObject::connect(pushButton, SIGNAL(clicked(bool)), PosteBancClass, SLOT(SendData()));
        QObject::connect(CancelAffaire, SIGNAL(clicked(bool)), PosteBancClass, SLOT(DeleteAffaire()));
        QObject::connect(ValideNewParemetre, SIGNAL(clicked(bool)), PosteBancClass, SLOT(ChangeValueAffaire()));
        QObject::connect(ChangeValueAffaire, SIGNAL(clicked(bool)), PosteBancClass, SLOT(EnableChangeValue()));
        QObject::connect(pushButton_2, SIGNAL(clicked(bool)), PosteBancClass, SLOT(StartRead()));

        QMetaObject::connectSlotsByName(PosteBancClass);
    } // setupUi

    void retranslateUi(QMainWindow *PosteBancClass)
    {
        PosteBancClass->setWindowTitle(QCoreApplication::translate("PosteBancClass", "PosteBanc", nullptr));
        ConnexionServeur->setTitle(QCoreApplication::translate("PosteBancClass", "Connexion", nullptr));
        label->setText(QCoreApplication::translate("PosteBancClass", "Adresse Serveur : ", nullptr));
        label_2->setText(QCoreApplication::translate("PosteBancClass", "Port serveur : ", nullptr));
        ButtonConnect->setText(QCoreApplication::translate("PosteBancClass", "Connexion Serveur", nullptr));
        InformationTest->setTitle(QCoreApplication::translate("PosteBancClass", "Information Test", nullptr));
        TextAffaire->setText(QCoreApplication::translate("PosteBancClass", "Affaire :", nullptr));
        TextCapteur->setText(QCoreApplication::translate("PosteBancClass", "Capteur :", nullptr));
        TextFrequence->setText(QCoreApplication::translate("PosteBancClass", "Fr\303\251quence :", nullptr));
        TextAcquisition->setText(QCoreApplication::translate("PosteBancClass", "Temp Acquisition :", nullptr));
        LabelAcquisition->setText(QString());
        LabelFrequence->setText(QString());
        LabelCapteur->setText(QString());
        LabelAffaire->setText(QString());
        pushButton->setText(QCoreApplication::translate("PosteBancClass", "Envoie message Serveur", nullptr));
        CancelAffaire->setText(QCoreApplication::translate("PosteBancClass", "Annuler Affaire", nullptr));
        LabelCapteurNew->setText(QCoreApplication::translate("PosteBancClass", "Nouveau Capteur :", nullptr));
        LabelFrequenceNew->setText(QCoreApplication::translate("PosteBancClass", "Nouvelle Fr\303\251quence :", nullptr));
        LabelTempAcquisitionNew->setText(QCoreApplication::translate("PosteBancClass", "Nouveau Temp acquisition :", nullptr));
        ChangeValueAffaire->setText(QCoreApplication::translate("PosteBancClass", "Changer Param\303\250tre affaire", nullptr));
        ValideNewParemetre->setText(QCoreApplication::translate("PosteBancClass", "Valider nouveau param\303\250tre Affaire", nullptr));
        pushButton_2->setText(QCoreApplication::translate("PosteBancClass", "Test Affaire", nullptr));
    } // retranslateUi

};

namespace Ui {
    class PosteBancClass: public Ui_PosteBancClass {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_POSTEBANC_H

#include "TcpServeur.h"
#include <QtWidgets/QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    TcpServeur w;
    w.show();
    return a.exec();
}

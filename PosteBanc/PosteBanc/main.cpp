#include "PosteBanc.h"
#include <QtWidgets/QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    PosteBanc w;
    w.show();
    return a.exec();
}

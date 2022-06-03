/****************************************************************************
** Meta object code from reading C++ file 'Arduino.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.14.2)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include <memory>
#include "../../../Arduino.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'Arduino.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.14.2. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_Arduino_t {
    QByteArrayData data[13];
    char stringdata0[182];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_Arduino_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_Arduino_t qt_meta_stringdata_Arduino = {
    {
QT_MOC_LITERAL(0, 0, 7), // "Arduino"
QT_MOC_LITERAL(1, 8, 16), // "ArduinoConnexion"
QT_MOC_LITERAL(2, 25, 0), // ""
QT_MOC_LITERAL(3, 26, 16), // "ArduinoConnected"
QT_MOC_LITERAL(4, 43, 19), // "ArduinoDisconnected"
QT_MOC_LITERAL(5, 63, 18), // "ArduinoSendRequest"
QT_MOC_LITERAL(6, 82, 14), // "StopConnection"
QT_MOC_LITERAL(7, 97, 15), // "CreateNewSocket"
QT_MOC_LITERAL(8, 113, 18), // "ArduinoReceiveData"
QT_MOC_LITERAL(9, 132, 13), // "getValueEntre"
QT_MOC_LITERAL(10, 146, 14), // "getValueSortie"
QT_MOC_LITERAL(11, 161, 8), // "getDebit"
QT_MOC_LITERAL(12, 170, 11) // "getListSize"

    },
    "Arduino\0ArduinoConnexion\0\0ArduinoConnected\0"
    "ArduinoDisconnected\0ArduinoSendRequest\0"
    "StopConnection\0CreateNewSocket\0"
    "ArduinoReceiveData\0getValueEntre\0"
    "getValueSortie\0getDebit\0getListSize"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_Arduino[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
      11,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,   69,    2, 0x0a /* Public */,
       3,    0,   70,    2, 0x0a /* Public */,
       4,    0,   71,    2, 0x0a /* Public */,
       5,    0,   72,    2, 0x0a /* Public */,
       6,    0,   73,    2, 0x0a /* Public */,
       7,    0,   74,    2, 0x0a /* Public */,
       8,    0,   75,    2, 0x0a /* Public */,
       9,    1,   76,    2, 0x0a /* Public */,
      10,    1,   79,    2, 0x0a /* Public */,
      11,    1,   82,    2, 0x0a /* Public */,
      12,    0,   85,    2, 0x0a /* Public */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Float, QMetaType::Int,    2,
    QMetaType::Float, QMetaType::Int,    2,
    QMetaType::Float, QMetaType::Int,    2,
    QMetaType::Int,

       0        // eod
};

void Arduino::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<Arduino *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->ArduinoConnexion(); break;
        case 1: _t->ArduinoConnected(); break;
        case 2: _t->ArduinoDisconnected(); break;
        case 3: _t->ArduinoSendRequest(); break;
        case 4: _t->StopConnection(); break;
        case 5: _t->CreateNewSocket(); break;
        case 6: _t->ArduinoReceiveData(); break;
        case 7: { float _r = _t->getValueEntre((*reinterpret_cast< int(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< float*>(_a[0]) = std::move(_r); }  break;
        case 8: { float _r = _t->getValueSortie((*reinterpret_cast< int(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< float*>(_a[0]) = std::move(_r); }  break;
        case 9: { float _r = _t->getDebit((*reinterpret_cast< int(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< float*>(_a[0]) = std::move(_r); }  break;
        case 10: { int _r = _t->getListSize();
            if (_a[0]) *reinterpret_cast< int*>(_a[0]) = std::move(_r); }  break;
        default: ;
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject Arduino::staticMetaObject = { {
    QMetaObject::SuperData::link<QObject::staticMetaObject>(),
    qt_meta_stringdata_Arduino.data,
    qt_meta_data_Arduino,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *Arduino::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *Arduino::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_Arduino.stringdata0))
        return static_cast<void*>(this);
    return QObject::qt_metacast(_clname);
}

int Arduino::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 11)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 11;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 11)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 11;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE

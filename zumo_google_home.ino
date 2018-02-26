#include <Wire.h>
#include <Zumo32U4.h>
Zumo32U4LCD lcd;

Zumo32U4Motors motors;

int incomingByte = 0;
int temp;
String a;

void setup() {

Serial.begin(115200); // opens serial port, sets data rate to 9600 bps

}

void loop() {


while(Serial.available()) {
a= Serial.readString();// read the incoming data as string
lcd.clear();
lcd.print(a);
temp = a.toInt();

if(temp == 1)
{
 motors.setLeftSpeed(400);
 motors.setRightSpeed(400);
 delay(1000);

 motors.setLeftSpeed(-400);
 motors.setRightSpeed(400);
delay(180);
}


if(temp == 0)
{
 motors.setLeftSpeed(0);
 motors.setRightSpeed(0);
 }
}



}



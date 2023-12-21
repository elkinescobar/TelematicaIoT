#include <DHT.h>
#include <ESPAsyncWebServer.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define DHTPIN 2      // Pin al que está conectado el sensor DHT11
#define DHTTYPE DHT11 // Tipo de sensor DHT

DHT dht(DHTPIN, DHTTYPE);

const int ventiladorPin = 5; // Pin al que está conectado el ventilador
const float TEMPERATURA_LIMITE = 30.0;
const float HUMEDAD_LIMITE_BAJA = 50.0;
const float HUMEDAD_LIMITE_ALTA = 70.0;

const char *ssid = "Elkin";
const char *password = "3127913613";
const char *serverUrl = "http://192.168.43.170:4000/telematica/postIoT";  // Reemplaza con la URL de tu servidor y el endpoint

AsyncWebServer server(4000);

void setup()
{
  Serial.begin(9600);
  dht.begin();
  pinMode(ventiladorPin, OUTPUT);

  // Conexión WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a la red WiFi");

  // Configuración del servidor web
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    float temperatura = dht.readTemperature();
    float humedad = dht.readHumidity();

    String respuesta = "Temperatura: " + String(temperatura) + " °C, Humedad: " + String(humedad) + " %";
    request->send(200, "text/plain", respuesta);
  });

  server.begin();
}

void loop()
{
  // Lectura de la temperatura y humedad
  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();

  // Verificar si la lectura es válida
  if (isnan(temperatura) || isnan(humedad))
  {
    Serial.println("ERROR EN EL SENSOR");
    return;
  }

  // Mostrar valores de temperatura y humedad
  Serial.print("Temperature: ");
  Serial.print(temperatura);
  Serial.print(" °C, Humidity: ");
  Serial.print(humedad);
  Serial.println("%");

  // Verificación de la temperatura
  if (temperatura > TEMPERATURA_LIMITE)
  {
    digitalWrite(ventiladorPin, HIGH); // Encender el ventilador
    Serial.println("Encendiendo ventilador");
  }
  else
  {
    digitalWrite(ventiladorPin, LOW); // Apagar el ventilador
  }

  // Verificación de la humedad baja
  if (humedad < HUMEDAD_LIMITE_BAJA)
  {
    Serial.println("Humedad baja");
  }
  // Verificación de la humedad alta
  else if (humedad > HUMEDAD_LIMITE_ALTA)
  {
    Serial.println("Humedad alta");
  }

  // Realizar la solicitud POST al servidor
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String postData = "temperatura=" + String(temperatura) + "&humedad=" + String(humedad);

  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0)
  {
    Serial.print("Solicitud POST exitosa. Código de respuesta: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error en la solicitud POST. Código de respuesta: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  delay(3000); // Esperar 3 segundos antes de la siguiente lectura y envío de datos
}

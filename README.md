# ICS Sentinel - Monitor de Seguridad Industrial (HMI + IDS)

## Sobre el Proyecto
Este proyecto, desarrollado bajo el nombre de **ICS Sentinel**, nace con el objetivo de cerrar la brecha entre las operaciones industriales (OT) y la seguridad informática (IT).

No se trata solo de un panel visual. Es una prueba de concepto técnica que demuestra cómo un sistema SCADA moderno puede integrar defensas activas contra ciberataques. Fue diseñado pensando en la infraestructura crítica, como estaciones de bombeo o plantas de tratamiento, donde un dato falso puede causar daños físicos reales.

El propósito principal de este repositorio es servir como base educativa y funcional para entender cómo proteger protocolos industriales frente a técnicas de intrusión como la inyección de datos (Fuzzing).

## ¿Qué hace exactamente?

El sistema simula el comportamiento de un PLC (Controlador Lógico Programable) conectado a una bomba hidráulica. Tiene dos componentes principales que trabajan en paralelo:

1.  **Interfaz HMI (Frontend):**
    Un panel de control web que permite a los operadores visualizar la telemetría en tiempo real: presión (PSI), rotación (RPM) y caudal. Está diseñado con un modo oscuro de alto contraste para reducir la fatiga visual en salas de control.

2.  **Sistema de Detección de Intrusos (IDS):**
    A diferencia de los paneles tradicionales que solo "muestran" datos, este sistema "analiza" los datos. Cuenta con un algoritmo interno que valida si la presión recibida es físicamente posible. Si detecta un pico anormal (típico de un ciberataque o falla de sensor), el sistema entra automáticamente en estado de alerta y bloquea la operación lógica.

## Cómo se construyó (Stack Tecnológico)

La arquitectura es híbrida, combinando desarrollo web moderno con lógica de sistemas embebidos:

* **Frontend:** Construido con **React y Vite** para garantizar una actualización de datos fluida y sin recargas.
* **Visualización:** Se utiliza la librería **Recharts** para renderizar las series temporales de los sensores con alta fidelidad.
* **Firmware Simulado:** Se incluye una carpeta `firmware_plc/` con código en **C puro**. Este código representa la lógica que iría dentro del chip físico del PLC, encargada de leer los sensores y ejecutar las paradas de emergencia.

## Guía de Uso para Desarrolladores

Si deseas utilizar este proyecto como base para tus propias pruebas o para entender la lógica SCADA:

**1. Instalación:**
Clona el repositorio e instala las dependencias de Node.js:
```bash
git clone [https://github.com/PatricKFER99/ICS-Sentinel--SEDAPAL.git](https://github.com/PatricKFER99/ICS-Sentinel--SEDAPAL.git)
cd ICS-Sentinel--SEDAPAL
npm install
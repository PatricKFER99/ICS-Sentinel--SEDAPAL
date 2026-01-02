# 🛡️ ICS Sentinel - SCADA & IDS Monitor

**Sistema de Monitoreo HMI con Detección de Intrusos para Infraestructuras Críticas (OT).**

![Status](https://img.shields.io/badge/Estado-Prototipo%20Funcional-green)
![Domain](https://img.shields.io/badge/Dominio-Ciberseguridad%20Industrial-blue)
![Compliance](https://img.shields.io/badge/Normativa-IEC%2062443-orange)

##  Resumen Ejecutivo

**ICS Sentinel** es una solución de software desarrollada por **DataCraft Victory** para cerrar la brecha entre la operación física y la seguridad digital. 

Este proyecto simula una interfaz HMI (Interfaz Hombre-Máquina) para una estación de bombeo hidráulico (contexto SEDAPAL), integrando un **Sistema de Detección de Intrusos (IDS)** directamente en el frontend. Su objetivo es identificar anomalías en los sensores provocadas por ciberataques de inyección de datos (*Fuzzing*) antes de que causen daños catastróficos a la maquinaria.

##  Funcionalidades Clave

### 1. Gemelo Digital (PLC Simulado)
* **Monitoreo en Tiempo Real:** Visualización de presión (PSI), RPM y Caudal con actualización de frecuencia de 1Hz.
* **Comportamiento Estocástico:** El sistema simula las variaciones naturales y el ruido de señal de sensores industriales reales.

### 2. Ciber-Defensa Activa (IDS)
* **Detección de Anomalías:** Algoritmo lógico que monitorea constantemente los umbrales operativos seguros.
* **Alerta Temprana:** Cambio inmediato de estado a `CRITICAL` visual y bloqueo lógico al detectar valores fuera del rango físico posible (ej: Picos de presión > 130 PSI repentinos).

### 3. Laboratorio de Pentesting
* **Botón de Ataque (Fuzzing):** Herramienta incorporada para auditores que inyecta datos aleatorios/maliciosos en el bus de datos simulado, permitiendo validar la resiliencia del sistema.

## 🛠️ Stack Tecnológico

Diseñado para ser ligero, rápido y desplegable en servidores Edge.

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Core** | React.js + Vite | Rendimiento reactivo sin recargas. |
| **Visualización** | Recharts | Gráficos de series temporales de alta velocidad. |
| **UI/UX** | Tailwind CSS | Diseño "Dark Mode" de alto contraste (Estándar SCADA). |
| **Iconografía** | Lucide React | Indicadores visuales semánticos. |

##  Roadmap y Visión (Futuro del Proyecto)

Este proyecto tiene un plan de escalabilidad para convertirse en un producto IoT físico:

- [x] **Fase 1:** Simulación web y lógica de defensa (Completado).
- [ ] **Fase 2:** Integración IoT con ESP32/Arduino para lectura de sensores físicos reales.
- [ ] **Fase 3:** Conexión a Base de Datos (Supabase) para auditoría forense de ataques.
- [ ] **Fase 4:** Implementación de protocolo MQTT para comunicación industrial real.

##  Instalación Local

Para desarrolladores o auditores que deseen probar el entorno:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/PatricKFER99/ICS-Sentinel--SEDAPAL.git](https://github.com/PatricKFER99/ICS-Sentinel--SEDAPAL.git)
    ```

2.  **Instalar dependencias:**
    ```bash
    cd ICS-Sentinel--SEDAPAL
    npm install
    ```

3.  **Ejecutar entorno:**
    ```bash
    npm run dev
    ```

##  Autoría y Derechos

**Arquitecto de Software:**
**Patrick Fernando Lopez Meza**
*Fundador de DataCraft Victory | Especialista en Seguridad OT*
*Secretario de Asuntos Tecnológicos - IESTP "Arturo Sabroso Montoya"*

---
**© 2026 DataCraft Victory.**
*Innovación en Seguridad para la Industria Peruana.*
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// --- CONFIGURACIÓN DEL FIRMWARE ---
#define UMBRAL_PRESION_MAX 130
#define SENSOR_ID 0xA1B2 // ID Hexadecimal del sensor
#define ARCHIVO_LOG "security_audit.txt"

// Simulamos la estructura de memoria de un PLC Industrial
// En la vida real, esto mapea registros físicos.
typedef struct {
    int id_sensor;          // 4 bytes
    float presion_actual;   // 4 bytes
    int estado_valvula;     // 0: CERRADA, 1: ABIERTA
    char status_flag[10];   // Estado del sistema: "OK", "ERROR", "HACK"
} RegistroPLC;

// Función para registrar eventos en disco (Auditoría Forense)
void log_evento(char *mensaje, float valor) {
    // En un PLC real, esto se escribiría en una memoria Flash protegida
    printf("[LOG INTERNO] Escribiendo alerta en disco...\n");
    // (Simulamos escritura visual aquí para la demo)
    printf(">> AUDIT RECORD: %s | Valor detectado: %.2f PSI\n", mensaje, valor);
}

// Función que simula la lectura del sensor físico (INPUT)
float leer_sensor_fisico() {
    // Generamos un valor aleatorio entre 80 y 140 para simular la presión
    return 85.0 + (rand() % 55); 
}

// --- CICLO PRINCIPAL (MAIN SCAN CYCLE) ---
int main() {
    srand(time(NULL)); // Semilla para números aleatorios
    
    // Asignación de memoria para el registro del PLC
    RegistroPLC controlador;
    controlador.id_sensor = SENSOR_ID;
    controlador.estado_valvula = 1; // Válvula abierta por defecto
    strcpy(controlador.status_flag, "NORMAL");

    printf("========================================\n");
    printf("   IRON-CORE PLC FIRMWARE v1.0.4        \n");
    printf("   SYSTEM: ONLINE | WATCHDOG: ACTIVE    \n");
    printf("========================================\n\n");

    int ciclo = 0;
    
    // Bucle infinito (Simulación de 10 ciclos para la demo)
    while (ciclo < 10) {
        printf("--- CICLO DE SCAN #%d ---\n", ciclo + 1);

        // 1. INPUT: Leer datos del mundo real
        controlador.presion_actual = leer_sensor_fisico();
        printf("[IO] Leyendo Sensor 0x%X... Presion: %.2f PSI\n", 
               controlador.id_sensor, controlador.presion_actual);

        // 2. PROCESS: Lógica de Seguridad (IDS Integrado)
        if (controlador.presion_actual > UMBRAL_PRESION_MAX) {
            // ¡ALERTA! Valor peligroso detectado
            printf("\n[!!!] ALERTA CRITICA: INTRUSION O FALLA DETECTADA [!!!]\n");
            
            // Acciones de Mitigación Inmediata
            controlador.estado_valvula = 0; // CERRAR VÁLVULA
            strcpy(controlador.status_flag, "HACKED");
            
            printf("[ACCION] Valvula de Seguridad -> CERRADA (Estado: %d)\n", controlador.estado_valvula);
            printf("[IDS] Protocolo de Defensa Activado.\n");
            
            // 3. OUTPUT: Registrar incidente
            log_evento("EXCESO_PRESION_CRITICA", controlador.presion_actual);
        } else {
            // Sistema estable
            controlador.estado_valvula = 1;
            strcpy(controlador.status_flag, "NORMAL");
            printf("[OK] Parametros Nominales. Valvula: ABIERTA.\n");
        }

        printf("----------------------------------------\n\n");
        
        // Simular espera del reloj del procesador
        // (En Windows local usarias Sleep(1000), aqui un bucle simple para no frenar la web)
        ciclo++;
    }

    printf(">> SISTEMA DETENIDO MANUALMENTE.\n");
    return 0;
}
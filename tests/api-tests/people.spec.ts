import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import peopleSchema from '../../schemas/peopleSchema';
import * as fs from 'fs';

const API_BASE_URL = 'https://swapi.tech/api';
const ajv = new Ajv();
addFormats(ajv);

test.describe('People API Tests', () => {   

    test('GET /people - Happy Path', async ({ request }) => {
        // Registrar el tiempo de inicio
        const startTime = Date.now();
        // Hacer la solicitud GET a la API de people
        const response = await request.get(`${API_BASE_URL}/people`);
        // Registrar el tiempo de finalización
        const endTime = Date.now();
        // Calcular el tiempo de respuesta
        const responseTime = endTime - startTime;

        // Verificar que el estado de la respuesta sea 200
        expect(response.status()).toBe(200);
        // Verificar que el tiempo de respuesta sea menor o igual a 5000 ms
        expect(responseTime).toBeLessThanOrEqual(5000);

        // Obtener el cuerpo de la respuesta en formato JSON
        const body = await response.json();
        // Escribir la respuesta en un archivo JSON
        fs.writeFileSync('responses/people.json', JSON.stringify(body, null, 2));
        // Verificar que el cuerpo de la respuesta tenga la propiedad 'results'
        expect(body).toHaveProperty('results');
        // Verificar que 'results' sea un array
        expect(Array.isArray(body.results)).toBeTruthy();
    });

    test('GET /people - Validar JSON schema', async ({ request }) => {
        // Hacer la solicitud GET a la API de people
        const response = await request.get(`${API_BASE_URL}/people`);
        // Obtener el cuerpo de la respuesta en formato JSON
        const body = await response.json();

        // Compilar el esquema JSON
        const validate = ajv.compile(peopleSchema);
        // Validar el cuerpo de la respuesta contra el esquema
        const isValid = validate(body);

        // Verificar que la validación sea exitosa
        expect(isValid).toBeTruthy();
    });

    test('GET /people/0 - No encontrado (404)', async ({ request }) => {
        // Hacer la solicitud GET a un people inexistente
        const response = await request.get(`${API_BASE_URL}/people/0`);
        // Verificar que el estado de la respuesta sea 404
        expect(response.status()).toBe(404);
    });

    test('POST /people - Servicio no disponible (503) contenido invalido', async ({ request }) => {
        // Hacer la solicitud POST con datos inválidos
        const response = await request.post(`${API_BASE_URL}/people`, {
            headers: {
                'Content-Type': 'text/plain'
            },
            data: 'invalid data'
        });
        // Verificar que el estado de la respuesta sea 503
        expect(response.status()).toBe(503);
    });

});
import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import planetsSchema from '../../schemas/planetsSchema';
import * as fs from 'fs';

const API_BASE_URL = 'https://swapi.tech/api';
const ajv = new Ajv();
addFormats(ajv);

test.describe('Planets API Tests', () => {   

    test('GET /planets - Happy Path', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.get(`${API_BASE_URL}/planets`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThanOrEqual(5000);


        const body = await response.json();
        fs.writeFileSync('responses/planets.json', JSON.stringify(body, null, 2));
        expect(body).toHaveProperty('results');
        expect(Array.isArray(body.results)).toBeTruthy();
    });

    test('GET /people - Validar JSON schema', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/planets`);
        const body = await response.json();

        const validate = ajv.compile(planetsSchema);
        const isValid = validate(body);

        expect(isValid).toBeTruthy();
    });


    test('GET /planets/0 - No encontrado (404)', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/planets/0`);
        expect(response.status()).toBe(404);
    });

    test('POST /planets - Servicio no disponible (503) contenido invalido', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/planets`, {
            headers: {
                'Content-Type': 'text/plain'
            },
            data: 'invalid data'
        });
        expect(response.status()).toBe(503);
    });

});
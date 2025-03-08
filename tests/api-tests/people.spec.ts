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
        const startTime = Date.now();
        const response = await request.get(`${API_BASE_URL}/people`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThanOrEqual(5000);

        const body = await response.json();
        fs.writeFileSync('responses/people.json', JSON.stringify(body, null, 2));
        expect(body).toHaveProperty('results');
        expect(Array.isArray(body.results)).toBeTruthy();
    });

    test('GET /people - Validar JSON schema', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/people`);
        const body = await response.json();

        const validate = ajv.compile(peopleSchema);
        const isValid = validate(body);

        expect(isValid).toBeTruthy();
    });


    test('GET /people/0 - No encontrado (404)', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/people/0`);
        expect(response.status()).toBe(404);
    });

    test('POST /people - Servicio no disponible (503) contenido invalidoe', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/people`, {
            headers: {
                'Content-Type': 'text/plain'
            },
            data: 'invalid data'
        });
        expect(response.status()).toBe(503);
    });

});
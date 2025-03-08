import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import filmsSchema from '../../schemas/filmsSchema';
import * as fs from 'fs';

const API_BASE_URL = 'https://swapi.tech/api';
const ajv = new Ajv();
addFormats(ajv);

test.describe('Films API Tests', () => {   

    test('GET /films - Happy Path', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.get(`${API_BASE_URL}/films`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThanOrEqual(5000);

        const body = await response.json();
        fs.writeFileSync('responses/films.json', JSON.stringify(body, null, 2));
        expect(body).toHaveProperty('result');
        expect(Array.isArray(body.result)).toBeTruthy();
    });

    test('GET /films - Validar JSON schema', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/films`);
        const body = await response.json();

        const validate = ajv.compile(filmsSchema);
        const isValid = validate(body);

        expect(isValid).toBeTruthy();
    });


    test('GET /films/0 - No encontrado (404)', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/films/0`);
        expect(response.status()).toBe(404);
    });

    test('POST /films - Servicio no disponible (503) contenido invalido', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/films`, {
            headers: {
                'Content-Type': 'text/plain'
            },
            data: 'invalid data'
        });
        expect(response.status()).toBe(503);
    });

});
import qs from 'qs';
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import {keycloak} from "./keycloak";
import {Token} from "keycloak-connect";
dotenv.config();
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!;
const REALM = process.env.KEYCLOAK_REALM!;
const KEYCLOAK_ADMIN_USERNAME = process.env.KEYCLOAK_ADMIN_USERNAME!;
const KEYCLOAK_ADMIN_PASSWORD = process.env.KEYCLOAK_ADMIN_PASSWORD!;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!;
export async function getAdminToken() {
    const tokenResponse = await fetch(
    `http://localhost:8080/realms/${REALM}/protocol/openid-connect/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify({
                grant_type: 'password',
                client_id: KEYCLOAK_CLIENT_ID,
                username: KEYCLOAK_ADMIN_USERNAME,
                password: KEYCLOAK_ADMIN_PASSWORD,
                client_secret: KEYCLOAK_CLIENT_SECRET,
            }),
        }
    );
    const accessToken = await tokenResponse.json();
    return accessToken['access_token'];
}

export async function createUserOnKeycloak(adminToken: string, username: string, password: string, email: string ) {
    const userInfoResponse = await fetch(
    `http://localhost:8080/admin/realms/${REALM}/users`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "username": username,
                    "email": email,
                    "enabled": true,
                    "credentials": [
                        {
                            "type": "password",
                            "value": password,
                            "temporary": false
                        }
                    ]
                }
            ),
        }
    );
    const locationHeader = userInfoResponse.headers.get('Location');
    return locationHeader?.split('/').pop();//return keycloak id
}

export async function mapUserToRole(adminToken: string, keycloakId: string) {
    const clientResponse = await fetch(
        `http://localhost:8080/admin/realms/${REALM}/clients?clientId=${KEYCLOAK_CLIENT_ID}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const clients = await clientResponse.json();
    const client = clients.find((c: any) => c.clientId === 'express-api');
    if (!client) {
        throw new Error('Client not found');
    }
    const clientId = client.id;

    const rolesResponse = await fetch(
        `http://localhost:8080/admin/realms/${REALM}/clients/${clientId}/roles`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    const roles = await rolesResponse.json();
    const roleToAssign = roles.find((role: any) => role.name === 'user');
    if (!roleToAssign) {
        throw new Error('Role "user" not found for client express-api');
    }
    await fetch(
        `http://localhost:8080/admin/realms/ecommserse/users/${keycloakId}/role-mappings/clients/${clientId}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    id: roleToAssign.id,
                    name: roleToAssign.name,
                },
            ]),
        }
    );
}

export async function getAccessToken(username: string, password: string) {
    const tokenResponse = await fetch(
        `http://localhost:8080/realms/${REALM}/protocol/openid-connect/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify({
                grant_type: 'password',
                client_id: KEYCLOAK_CLIENT_ID,
                username: username,
                password: password,
                client_secret: KEYCLOAK_CLIENT_SECRET,
            }),
        }
    );
    const accessToken = await tokenResponse.json();
    return  [accessToken['access_token'], accessToken['refresh_token']];

}
export async function getKeycloakId(adminToken: string, username: string, password: string) {
    const userInfoResponse = await fetch(
        `http://localhost:8080/admin/realms/${REALM}/users`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "grant_type": "password",
                    "username": username,
                    "client_id": KEYCLOAK_CLIENT_ID,
                    "password": password,
                    "client_secret": KEYCLOAK_CLIENT_SECRET,
                }
            ),
        }
    );
    const locationHeader = userInfoResponse.headers.get('Location');
    return locationHeader?.split('/').pop();//return keycloak id
}






import {Request, Response, NextFunction} from "express";
import {Token} from "keycloak-connect";
const USER_ROLE = process.env.USER_ROLE;
const ADMIN_ROLE = process.env.ADMIN_ROLE;
import dotenv from 'dotenv';

dotenv.config();
const session = require("express-session");
const Keycloak = require("keycloak-connect");

const kcConfig = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    bearerOnly: false,
    serverUrl: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
};

const memoryStore = new session.MemoryStore();

Keycloak.prototype.accessDenied = function (request: Request, response: Response) {
    response.status(401)
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ status: 401, message: 'Unauthorized/Forbidden', result: { errorCode: 'ERR-401', errorMessage: 'Unauthorized/Forbidden' } }))
}

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
function adminOnly(token: any, request: Request, Response: Response) {
    return token.hasRole(`${process.env.KEYCLOAK_CLIENT_ID}:${ADMIN_ROLE}`);
}

function isAuthenticated(token: any, request: Request) {
    return token.hasRole(`${process.env.KEYCLOAK_CLIENT_ID}:${ADMIN_ROLE}`) || token.hasRole(`${process.env.KEYCLOAK_CLIENT_ID}:${USER_ROLE}`);
}



export { keycloak, isAuthenticated, adminOnly, memoryStore};
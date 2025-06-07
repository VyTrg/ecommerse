import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import bcrypt from "bcrypt";
import {getAccessToken} from "../middleware/keycloakToken";

interface RegisterRequestBody {
  username: string;
  password: string;
  phone: string;
  email: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}
function decodeToken(token: string) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  const { username, password, phone, email } = req.body;

  const user = await AuthService.register(username, password, email, phone);

  res.status(201).json({
    status: "success",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
  });
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const accessToken = await getAccessToken(username, password);
    let isAdmin = false;

    if (accessToken) {
      const decoded = decodeToken(accessToken);
      const roles = decoded?.resource_access?.['express-api']?.roles || [];
      isAdmin = roles.includes('admin');
    }
    if(isAdmin){
      res.status(200).json({
        status: "success",
        accessToken: accessToken,
      });
    }
    else{
      const user = await AuthService.login(username, password);

      res.status(200).json({
        status: "success",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
        },
        accessToken: accessToken,
      });
    }
  } catch (error: any) {
    res.status(401).json({
      status: "error",
      message: error.message || "Đăng nhập thất bại",
    });
  }
};

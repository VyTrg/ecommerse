import { AppDataSource } from "../config/datasource";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import {createUserOnKeycloak, getAdminToken, mapUserToRole} from "../middleware/keycloakToken";

export const AuthService = {

  async register(username: string, password: string, email: string, phone: string) {
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOneBy({ username });
    if (existing) {
      throw new Error("Username đã tồn tại");
    }
    const adminToken = await getAdminToken();
    const hashedPassword = await bcrypt.hash(password, 10);
    const keycloakId = await createUserOnKeycloak(adminToken, username, password, email);
    if (!keycloakId) {
        throw new Error("Failed to retrieve Keycloak ID for the user.");
    }
    await mapUserToRole(adminToken, keycloakId);
    const user = userRepo.create({
      username,
      email,
      phone,
      hash_password: hashedPassword,
      keycloakId: keycloakId,
    });

    return await userRepo.save(user);
  },


  async login(username: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username });
    if (!user) {
      throw new Error("Tài khoản không tồn tại");
    }

    const isMatch = await bcrypt.compare(password, user.hash_password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }
    return user;
  },
};

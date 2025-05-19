import {User} from "../entity/User"
import {User_address} from "../entity/UserAddress"
import {Address} from "../entity/Address"
import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import bcrypt from "bcrypt";

export class UserService {
    private userRepository: Repository<User>;
    private addressRepository: Repository<Address>;
    private useAddressRepository: Repository<User_address>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.addressRepository = AppDataSource.getRepository(Address);
        this.useAddressRepository = AppDataSource.getRepository(User_address);
    }


    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({relations: ['carts', 'orders']});
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({where: {id}, relations: ['carts', 'orders']});
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.hash_password!, 10);
        const user = await this.userRepository.create({...userData, hash_password: hashedPassword});
        return this.userRepository.save(user);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            return null;
        }
        Object.assign(user, userData);
        return this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected !== 0;
    }

    async addUserAddress(userId: number, addressData: Partial<Address>, isDefault: boolean): Promise<User_address> {
        const user = await this.getUserById(userId);
        if (!user) throw new Error("User not found");

        const address = this.addressRepository.create(addressData);
        await this.addressRepository.save(address);

        const userAddress = this.useAddressRepository.create({
            user_id: userId,
            address_id: address.id,
            is_default: isDefault ? "1" : "0",
            address: address
        });

        return this.useAddressRepository.save(userAddress);
    }
}
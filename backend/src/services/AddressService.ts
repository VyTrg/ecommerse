import { Repository } from "typeorm";
import { Address } from "../entity/Address";
import { User_address } from "../entity/UserAddress";
import { AppDataSource } from "../config/datasource";

export class AddressService {
    private addressRepository: Repository<Address>;
    private userAddressRepository: Repository<User_address>;

    constructor() {
        this.addressRepository = AppDataSource.getRepository(Address);
        this.userAddressRepository = AppDataSource.getRepository(User_address);
    }

    async getAddressesByUserId(userId: number): Promise<Address[]> {
        const userAddresses = await this.userAddressRepository.find({
            where: { address_id: userId },
            relations: ["address"],
        });

        return userAddresses.map((ua) => ua.address);
    }
    async createAddress(userId: number, addressData: Partial<Address>): Promise<Address> {
        const newAddress = this.addressRepository.create(addressData);
        const savedAddress = await this.addressRepository.save(newAddress);

        const userAddress = this.userAddressRepository.create({
            // user_id: userId,
            address_id: savedAddress.id,
            is_default: "no",
            address: savedAddress
        });

        await this.userAddressRepository.save(userAddress);

        return savedAddress;
    }
    async updateAddress(id: number, updateData: Partial<Address>): Promise<Address | null> {
        const address = await this.addressRepository.findOneBy({ id });
        if (!address) return null;

        Object.assign(address, updateData);
        return await this.addressRepository.save(address);
    }

    async deleteAddress(userId: number, addressId: number): Promise<boolean> {
        console.log("call to service:",userId, addressId);
        const result = await this.userAddressRepository.delete({address_id: userId, address: { id: addressId } });


        // const result = await this.addressRepository.delete({ id: addressId });
        return result.affected !== 0;
    }
}
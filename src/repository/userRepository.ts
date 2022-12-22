import { Service } from "typedi";
import { userModel } from "../models/user";
import { UserDTO } from "../DTO/userDTO";
import { UserMap } from "../validates/userMap";

@Service()
export class UserRepository{
    constructor(private userMap: UserMap) { }
    
    async find() {
        const find = await userModel.find()
        const carArray: UserDTO[] = [];

        for (let i of find) {
            const vol = this.userMap.mapEntityToDto(i)
            carArray.push(vol)
        }
        return carArray;
    }

    //Resolve the id conversion
    async findById(id: string): Promise<UserDTO | null> {
        const convert = { "_id": id }
        const userfindById = await userModel.findById(convert);
        const returnDto = this.userMap.mapEntityToDto(userfindById)
        return returnDto;
    }

    async insert(document: UserDTO) {
        const usersInserts = await userModel.insertMany(document);
        return usersInserts;
    }

    async update(id: string, document: JSON) {
        const convert = { "_id": id }
        const userUbdate = await userModel.updateMany(convert, document);
        return userUbdate;
    }

    async delete(id: string) {
        const convert = { "_id": id }
        const userDelete = await userModel.deleteMany(convert);
        return userDelete;
    }
}
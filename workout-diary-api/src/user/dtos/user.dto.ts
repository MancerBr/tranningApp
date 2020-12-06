import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;
}

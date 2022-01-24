import { PickType } from "@nestjs/swagger";
import { User } from "src/entities";

export class CreateUserDto extends PickType(User,
  [
    'email',
    'nickname',
    'password'
  ] as const) {};
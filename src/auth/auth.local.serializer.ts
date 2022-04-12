import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    try {
      const user = await this.userRepository.findOne({ id: Number(userId) });
      done(null, user);
    } catch(e) {
      done(e);
    }
  }
}
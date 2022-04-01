import { UnauthorizedException } from "@nestjs/common";
import { UserHttpResponseMessageEnum } from "src/common/enums";
import { User } from "src/entities";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUser(value: string) {
    const queryBuilder = await this.createQueryBuilder()
      .where('user.email = :email', { email: value })
      .orWhere('user.nickname = :nickname', { nickname: value })
      .getOne();
      
    if(!queryBuilder) {
      throw new UnauthorizedException(UserHttpResponseMessageEnum.NOTEXIST_USER);
    }

    return queryBuilder;
  }
}
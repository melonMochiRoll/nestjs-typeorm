import { Tag } from "src/entities";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagQueryRepository extends Repository<Tag> {
  async getMemosByTag(
    tag: string,
  ): Promise<any> {
    const result = await getRepository(Tag)
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.memos', 'memo')
      .where('tag.tag = :tag', { tag })
      .getMany();

    return result;
  }
}
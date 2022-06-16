import { Memo, MemoTag, Tag } from "src/entities";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagQueryRepository extends Repository<Tag> {
  async getMemosByTag(
    tagId: number,
    currentNumber: number,
  ): Promise<any> {
    return await getRepository(MemoTag)
      .createQueryBuilder('memoTag')
      .innerJoinAndSelect('memoTag.memo', 'memo')
      .where('memotag.tagId = :tagId', { tagId })
      .orderBy('memo.updatedAt', 'DESC')
      .take(currentNumber)
      .getMany();
  }

  async getMemoCountByTag(
    id: number,
  ): Promise<any> {
    return await getRepository(Tag)
      .createQueryBuilder('tag')
      .innerJoin('tag.memos', 'memo')
      .addSelect('COUNT(*) AS count')
      .where('tag.id = :id', { id })
      .getRawOne();
  }
}
import { MemoCount } from "src/common/interfaces";
import { Memo } from "src/entities";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(Memo)
export class MemoQueryRepository extends Repository<Memo> {
  async getMemoCount(
    userId: number,
    ): Promise<MemoCount[]> {
    return await getRepository(Memo)
      .createQueryBuilder('memo')
      .select('memo.folderName AS folderName')
      .addSelect('COUNT(*) AS count')
      .where('memo.userId = :userId', { userId })
      .groupBy('memo.folderName')
      .getRawMany();
  }

  async getMemosByFolderName(
    userId: number,
    folderName: string,
  ): Promise<Memo[]> {
    return await getRepository(Memo)
      .createQueryBuilder('memo')
      .leftJoinAndSelect('memo.tags', 'tag')
      .where('memo.userId = :userId', { userId })
      .andWhere('memo.folderName = :folderName', { folderName })
      .orderBy('memo.updatedAt', 'DESC')
      .getMany();
  }
}
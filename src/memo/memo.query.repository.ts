import { MemoCount } from "src/common/interfaces";
import { Memo } from "src/entities";
import { createQueryBuilder, EntityRepository, Repository } from "typeorm";

@EntityRepository(Memo)
export class MemoQueryRepository extends Repository<Memo> {
  async getMemoCount(
    userId: number,
    ): Promise<MemoCount[]> {
    const folderCount = await createQueryBuilder()
      .select('memo.folderName AS folderName')
      .from(Memo, 'memo')
      .addSelect('COUNT(*) AS count')
      .where('memo.userId = :userId', { userId })
      .groupBy('memo.folderName')
      .cache(true)
      .getRawMany();

    return folderCount;
  }

  async getMemosByFolderName(
    userId: number,
    folderName: string,
  ): Promise<Memo[]> {
    const memos = await createQueryBuilder()
      .select('memo')
      .from(Memo, 'memo')
      .where('memo.userId = :userId', { userId })
      .andWhere('memo.folderName = :folderName', { folderName })
      .cache(true)
      .getRawMany();
    
    return memos;
  }
}
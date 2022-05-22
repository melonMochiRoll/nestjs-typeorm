import { Memo } from "src/entities";
import { createQueryBuilder, EntityRepository, Repository } from "typeorm";

@EntityRepository(Memo)
export class MemoQueryRepository extends Repository<Memo> {
  async getMemoFolderCount(
    userId: number,
    ): Promise<any[]> {
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
}
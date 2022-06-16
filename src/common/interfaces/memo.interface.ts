import { Memo } from "src/entities";

export interface MemoCount {
  folderName: string;
  count: number;
}

export interface MemoWithHasMore {
  memos: Memo[];
  hasMore: boolean;
}
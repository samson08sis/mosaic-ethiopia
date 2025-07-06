import { Session } from "next-auth";

declare module "mongoose" {
  interface Query<ResultType, DocType> {
    cache?: {
      key: string;
    };
  }
}

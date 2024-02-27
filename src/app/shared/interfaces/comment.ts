// app/comment.model.ts
export interface Comment {
    id?: string;  // Hacemos el ID opcional porque, en la creación, aún no lo tenemos
    comment: string;
    date: Date;
    likeCount: number;
    dislikeCount: number;
  }
  
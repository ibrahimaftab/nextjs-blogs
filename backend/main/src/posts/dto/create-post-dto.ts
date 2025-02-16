interface UpdateAt {
  readonly date: Date;
  readonly authorId: number;
}

export class CreatePostDto {
  readonly title: string;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly author_id: number;
  readonly published?: boolean;
}

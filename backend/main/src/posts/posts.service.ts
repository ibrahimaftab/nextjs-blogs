import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostParams } from './interfaces/post.interface';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: PostParams) {
    try {
      return await this.prisma.post.findMany({
        take: params.take,
        cursor: params.cursor,
        skip: params.skip,
        orderBy: params.orderBy,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findFirst({
        where: { id },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return post;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch post');
    }
  }

  async create(data: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data,
        include: { author: true },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async update(id: number, data: CreatePostDto) {
    try {
      return await this.prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete post');
    }
  }
}

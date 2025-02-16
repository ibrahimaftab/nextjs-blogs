import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('all/:take/:skip/:lastId')
  async findAll(
    @Param('take') take: string = '10',
    @Param('skip') skip: string = '0', // Default to '0' instead of undefined
    @Param('lastId') lastId?: string,
  ) {
    return await this.postsService.findAll({
      take: Number(take), // Ensure numeric conversion
      skip: Number(skip), // Explicitly set a number
      cursor: lastId ? { id: Number(lastId) } : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return await this.postsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(Number(id));
  }
}

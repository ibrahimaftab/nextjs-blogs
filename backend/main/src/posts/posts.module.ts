import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ Add PrismaModule
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

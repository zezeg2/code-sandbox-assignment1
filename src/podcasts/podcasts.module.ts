import { Module } from '@nestjs/common';
import { EpisodesModule } from 'src/episodes/episodes.module';
import { PodcastsController } from './podcasts.controller';
import { PodCastsService } from './podcasts.service';

@Module({
  imports: [EpisodesModule],
  controllers: [PodcastsController],
  providers: [PodCastsService],
})
export class PodcastsModule {}

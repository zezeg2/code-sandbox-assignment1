import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { PodcastsModule } from './podcasts/podcasts.module';

@Module({
  imports: [PodcastsModule, EpisodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

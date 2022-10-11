import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Episode } from '../episodes/entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodCastsService } from './podcasts.service';

export type createPodcastDto = {
  title: string;
  category: string;
  rating: number;
  episodes: Episode[];
};

export type patchPodcastDto = {
  title?: string;
  category?: string;
  rating?: number;
  episodes?: Episode[];
};

export type createEpisodeDto = {
  content: string;
};

export type patchEpisodeDto = {
  content?: string;
};

export type CustomResponse = {
  isOK: boolean;
  data?: any;
  error?: string;
};

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodCastsService) {}

  /*
  GET /podcasts
  POST /podcasts
  GET /podcasts/:id
  PATCH /podcasts/:id
  DELETE /podcasts/:id
  GET /podcasts/:id/episodes
  POST /podcasts/:id/episodes
  PATCH /podcasts/:id/episodes/:episodeId
  DELETE /podcasts/:id/episodes/:episodeId
  */

  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcast();
  }

  @Post()
  createPodcast(@Body() createData: createPodcastDto): Podcast {
    return this.podcastsService.createPodcast(createData);
  }

  @Get('/:id')
  getPodcast(@Param('id') id: number): Podcast | CustomResponse {
    return this.podcastsService.getPodcast(id);
  }

  @Patch('/:id')
  patchPodcast(
    @Param('id') id: number,
    @Body() patchData: patchPodcastDto,
  ): Podcast | CustomResponse {
    return this.podcastsService.patchPodcast(id, patchData);
  }

  @Delete('/:id')
  deletePodcast(@Param('id') id: number): void {
    this.podcastsService.deletePodcast(id);
  }

  @Get('/:id/episodes')
  getAllEpisodes(@Param('id') id: number): Episode[] | CustomResponse {
    return this.podcastsService.getAllEpisodes(id);
  }

  @Post('/:id/episodes')
  createEpisode(
    @Param('id') id: number,
    @Body() createData: createEpisodeDto,
  ): Episode | CustomResponse {
    return this.podcastsService.createEpisode(id, createData);
  }

  @Patch('/:id/episodes/:episodeId')
  patchEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
    @Body() patchData: patchEpisodeDto,
  ): Episode | CustomResponse {
    return this.podcastsService.patchEpisode(id, episodeId, patchData);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
  ): void | CustomResponse {
    return this.podcastsService.deleteEpisode(id, episodeId);
  }
}

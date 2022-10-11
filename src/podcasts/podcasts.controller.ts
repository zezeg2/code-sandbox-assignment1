import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Episode } from '../episodes/entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodCastsService } from './podcasts.service';
import {
  CreateEpisodeDto,
  CreatePodcastDto,
  CustomResponse,
  PatchEpisodeDto,
  PatchPodcastDto,
} from './podcasts.dtos';

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
  getAllPodcasts(): CustomResponse {
    return this.podcastsService.getAllPodcast();
  }

  @Post()
  createPodcast(@Body() createData: CreatePodcastDto): CustomResponse {
    return this.podcastsService.createPodcast(createData);
  }

  @Get(':id')
  getPodcast(@Param('id') id: number): CustomResponse {
    return this.podcastsService.getPodcast(id);
  }

  @Patch(':id')
  patchPodcast(
    @Param('id') id: number,
    @Body() patchData: PatchPodcastDto,
  ): CustomResponse {
    return this.podcastsService.patchPodcast(id, patchData);
  }

  @Delete(':id')
  deletePodcast(@Param('id') id: number): CustomResponse {
    return this.podcastsService.deletePodcast(id);
  }

  @Get(':id/episodes')
  getAllEpisodes(@Param('id') id: number): CustomResponse {
    return this.podcastsService.getAllEpisodes(id);
  }

  @Post(':id/episodes')
  createEpisode(
    @Param('id') id: number,
    @Body() createData: CreateEpisodeDto,
  ): CustomResponse {
    return this.podcastsService.createEpisode(id, createData);
  }

  @Patch(':id/episodes/:episodeId')
  patchEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
    @Body() patchData: PatchEpisodeDto,
  ): CustomResponse {
    return this.podcastsService.patchEpisode(id, episodeId, patchData);
  }

  @Delete(':id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') id: number,
    @Param('episodeId') episodeId: number,
  ): CustomResponse {
    return this.podcastsService.deleteEpisode(id, episodeId);
  }
}

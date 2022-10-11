import { Injectable } from '@nestjs/common';
import { EpisodesService } from 'src/episodes/episodes.service';
import { Episode } from '../episodes/entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import {
  CreateEpisodeDto,
  CreatePodcastDto,
  CustomResponse,
  PatchEpisodeDto,
  PatchPodcastDto,
} from './podcasts.dtos';

@Injectable()
export class PodCastsService {
  constructor(private readonly episodesService: EpisodesService) {}
  podcasts: Podcast[] = [];
  genId = 0;

  autoIncrementId(): number {
    return ++this.genId;
  }

  getAllPodcast(): CustomResponse {
    return { isOK: true, data: this.podcasts };
  }
  createPodcast(createData: CreatePodcastDto): CustomResponse {
    const podcast: Podcast = { id: this.autoIncrementId(), ...createData };
    if (podcast.episodes === undefined) podcast.episodes = [];
    podcast.episodes.forEach((e) => {
      e.podcastId = this.genId;
      e.id = this.episodesService.autoIncrementId();
      this.episodesService.getEpisodes().push(e);
    });
    this.podcasts.push(podcast);
    return { isOK: true, data: podcast };
  }
  getPodcast(id: number): CustomResponse {
    const found: Podcast | undefined = this.podcasts.find((o) => o.id === +id);
    if (found) return { isOK: true, data: found };
    return { isOK: false, error: 'Not Found Podcast' };
  }
  patchPodcast(id: number, patchData: PatchPodcastDto): CustomResponse {
    const found: Podcast | undefined = this.podcasts.find((o) => o.id === +id);
    if (found) {
      found.title =
        patchData.title !== undefined ? patchData.title : found.title;
      found.category =
        patchData.category !== undefined ? patchData.category : found.category;
      found.rating =
        patchData.rating !== undefined ? patchData.rating : found.rating;
      return { isOK: true, data: found };
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
  deletePodcast(id: number): CustomResponse {
    this.podcasts = this.podcasts.filter((o) => o.id !== +id);
    return { isOK: true };
  }
  getAllEpisodes(id: number): CustomResponse {
    if (this.podcasts.find((o) => o.id === +id)) {
      return this.episodesService.getEpisodesPodcastIdIs(id);
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
  createEpisode(id: number, createData: CreateEpisodeDto): CustomResponse {
    const found = this.podcasts.find((o) => o.id === +id);
    if (found) {
      const result = this.episodesService.createEpisode(id, createData);
      found.episodes.push(result.data);
      return result;
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
  patchEpisode(
    id: number,
    episodeId: number,
    patchData: PatchEpisodeDto,
  ): CustomResponse {
    if (this.podcasts.find((o) => o.id === +id))
      return this.episodesService.patchEpisode(episodeId, patchData);
    return { isOK: false, error: 'Not Found Podcast' };
  }
  deleteEpisode(id: number, episodeId: number): CustomResponse {
    const found = this.podcasts.find((o) => o.id === +id);
    if (found) {
      found.episodes = found.episodes.filter((o) => o.id !== +episodeId);
      return this.episodesService.deleteEpisode(episodeId);
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
}

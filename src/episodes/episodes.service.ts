import { Injectable } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import {
  CreateEpisodeDto,
  CustomResponse,
  PatchEpisodeDto,
} from '../podcasts/podcasts.dtos';

@Injectable()
export class EpisodesService {
  episodes: Episode[] = [];
  genId = 0;

  getEpisodes(): Episode[] {
    return this.episodes;
  }

  autoIncrementId(): number {
    return ++this.genId;
  }

  getEpisodesPodcastIdIs(id: number): CustomResponse {
    return {
      isOK: true,
      data: this.episodes.filter((o) => o.podcastId === +id),
    };
  }
  createEpisode(id: number, createData: CreateEpisodeDto): CustomResponse {
    const episode: Episode = {
      id: this.autoIncrementId(),
      podcastId: +id,
      ...createData,
    };
    this.episodes.push(episode);
    return { isOK: true, data: episode };
  }
  patchEpisode(id: number, patchData: PatchEpisodeDto): CustomResponse {
    const found: Episode | undefined = this.episodes.find((o) => o.id === +id);
    if (found) {
      found.content =
        patchData.content !== undefined ? patchData.content : found.content;
      return { isOK: true, data: found };
    }
    return { isOK: false, error: 'Not Found Episode' };
  }
  deleteEpisode(id: number): CustomResponse {
    this.episodes = this.episodes.filter((o) => o.id !== +id);
    return { isOK: true };
  }
}

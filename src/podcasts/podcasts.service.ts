import { Injectable } from '@nestjs/common';
import { EpisodesService } from 'src/episodes/episodes.service';
import { Episode } from '../episodes/entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import {
  createEpisodeDto,
  createPodcastDto,
  CustomResponse,
  patchEpisodeDto,
  patchPodcastDto
} from './podcasts.controller';

@Injectable()
export class PodCastsService {
  constructor(private readonly episodesService: EpisodesService) { }
  podcasts: Podcast[] = [];
  genId: number = 0;

  autoIncrementId(): number {
    return ++this.genId;
  }

  getAllPodcast(): Podcast[] {
    return this.podcasts;
  }
  createPodcast(createData: createPodcastDto): Podcast {
    const podcast: Podcast = { id: this.autoIncrementId(), ...createData };
    podcast.episodes.forEach((e) => {
      e.podcastId = this.genId;
      this.episodesService.getEpisodes().push(e);
    });
    this.podcasts.push(podcast);
    return podcast;
  }
  getPodcast(id: number): Podcast | CustomResponse {
    const found: Podcast | undefined = this.podcasts.find((o) => o.id === id);
    if (found) return { isOK: true, data: found };
    return { isOK: false, error: 'Not Found Podcast' };
  }
  patchPodcast(
    id: number,
    patchData: patchPodcastDto,
  ): Podcast | CustomResponse {
    const found: Podcast | undefined = this.podcasts.find((o) => o.id === id);
    if (found) {
      found.title = patchData.title !== null ? patchData.title : found.title;
      found.category =
        patchData.category !== null ? patchData.category : found.category;
      found.rating =
        patchData.rating !== null ? patchData.rating : found.rating;
      found.episodes =
        patchData.episodes !== null ? patchData.episodes : found.episodes;
      return found;
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
  deletePodcast(id: number): void {
    this.podcasts = this.podcasts.filter((o) => o.id !== id);
  }
  getAllEpisodes(id: number): Episode[] | CustomResponse {
    if (this.podcasts.find((o) => o.id === id)) {
      return this.episodesService.getEpisodesPodcastIdIs(id);
    }
    return { isOK: false, error: 'Not Found Podcast' };
  }
  createEpisode(id: number, createData: createEpisodeDto): CustomResponse {
    if (this.podcasts.find((o) => o.id === id))
      return this.episodesService.createEpisode(id, createData);
    return { isOK: false, error: 'Not Found Podcast' };
  }
  patchEpisode(
    id: number,
    episodeId: number,
    patchData: patchEpisodeDto,
  ): CustomResponse {
    if (this.podcasts.find((o) => o.id === id))
      return this.episodesService.patchEpisode(episodeId, patchData);
    return { isOK: false, error: 'Not Found Podcast' };
  }
  deleteEpisode(id: number, episodeId: number): void | CustomResponse {
    if (this.podcasts.find((o) => o.id === id))
      return this.episodesService.deleteEpisode(episodeId);
    return { isOK: false, error: 'Not Found Podcast' };
  }
}

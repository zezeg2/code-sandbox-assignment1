import { Episode } from '../episodes/entities/episode.entity';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePodcastDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsArray()
  episodes: Episode[];
}

export class PatchPodcastDto {
  @IsString()
  title?: string;
  @IsString()
  category?: string;
  @IsNumber()
  rating?: number;
}

export class CreateEpisodeDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class PatchEpisodeDto {
  @IsString()
  content?: string;
}

export class CustomResponse {
  isOK: boolean;
  data?: any;
  error?: string;
}

import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HttpSuccessFilter } from '../commons/filters/http-success.filter';

@Controller('api/v1/files')
@ApiTags('files')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Get(':id/kills-by-players')
  findGamesById(@Param('id') id: string) {
    return this.filesService.findKillsByPlayers(id);
  }

  @Get(':id/kills-by-means')
  findKillsByMeans(@Param('id') id: string) {
    return this.filesService.findKillsByMeans(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(HttpSuccessFilter)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }
}

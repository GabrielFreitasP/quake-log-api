import { FileEntity } from '../entities/file.entity';
import { FileStatusEnum } from '../enums/file-status.enum';

export class FileMapper {
  static fileToEntity(
    file: Express.Multer.File,
    status: FileStatusEnum = FileStatusEnum.Created,
  ) {
    const fileEntity = new FileEntity();
    fileEntity.status = status;
    fileEntity.fieldName = file.fieldname;
    fileEntity.originalName = file.originalname;
    fileEntity.mimeType = file.mimetype;
    fileEntity.size = file.size;
    fileEntity.destination = file.destination;
    fileEntity.fileName = file.filename;
    fileEntity.path = file.path;
    return fileEntity;
  }
}

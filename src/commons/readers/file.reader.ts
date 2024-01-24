import * as fs from 'fs';

export class FileReader {
  static readFileLines(path: string): string[] {
    return fs.readFileSync(path, 'utf-8').split('\n');
  }
}

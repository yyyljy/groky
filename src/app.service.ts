import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  private readonly chatDir = 'chat';

  async chatWithAI(messages: any[]) {
    try {
      const apiKey = this.configService.get<string>('XAPI_KEY');

      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages,
          model: 'grok-beta',
          stream: false,
          temperature: 0,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(
        '채팅 처리 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChatList() {
    const files = await fs.readdir(this.chatDir);
    const chatFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const stats = await fs.stat(join(this.chatDir, file));
          const content = await fs.readFile(join(this.chatDir, file), 'utf-8');
          const title = content.split('\n')[0].replace('# ', '');

          return {
            filename: file,
            title,
            date: stats.mtime.toLocaleDateString(),
          };
        }),
    );

    return chatFiles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  async getChat(filename: string) {
    const content = await fs.readFile(join(this.chatDir, filename), 'utf-8');

    const [, userSection, assistantSection] = content.split('## ');
    return {
      userMessage: userSection.split('\n').slice(1).join('\n').trim(),
      assistantMessage: assistantSection.split('\n').slice(1).join('\n').trim(),
    };
  }

  async saveChat(filename: string, content: string) {
    await fs.mkdir(this.chatDir, { recursive: true });
    await fs.writeFile(join(this.chatDir, filename), content);
    return { success: true };
  }
}

import { Controller, Post, Body, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class ChatController {
  constructor(private readonly chatService: AppService) {}

  @Get('index')
  serveIndex(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Get('chat-list')
  async getChatList() {
    return this.chatService.getChatList();
  }

  @Get('chat/:filename')
  async getChat(@Param('filename') filename: string) {
    return this.chatService.getChat(filename);
  }

  @Post('save-chat')
  async saveChat(@Body() data: { filename: string; content: string }) {
    return this.chatService.saveChat(data.filename, data.content);
  }

  @Post('api/chat')
  async chatWithAI(@Body() data: { messages: any[] }) {
    return this.chatService.chatWithAI(data.messages);
  }
}

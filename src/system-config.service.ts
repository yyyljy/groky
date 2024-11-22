import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class SystemConfigService implements OnModuleInit {
  private static instance: SystemConfigService;
  private configPath = join('config', 'system.config.json');
  private systemContent: string;

  constructor() {
    if (!SystemConfigService.instance) {
      SystemConfigService.instance = this;
    }
    return SystemConfigService.instance;
  }

  async onModuleInit() {
    await this.loadConfig();
  }

  private async loadConfig() {
    try {
      const content = await fs.readFile(this.configPath, 'utf-8');
      const config = JSON.parse(content);
      this.systemContent = config.systemContent;
    } catch (error) {
      this.systemContent = 'You are a test assistant. Answer in Korean.';
      await this.saveConfig();
    }
  }

  private async saveConfig() {
    const config = { systemContent: this.systemContent };
    await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
  }

  getSystemContent(): string {
    return this.systemContent;
  }

  async setSystemContent(content: string): Promise<void> {
    this.systemContent = content;
    await this.saveConfig();
  }
}

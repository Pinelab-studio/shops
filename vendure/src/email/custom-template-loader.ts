import { Injector, RequestContext } from '@vendure/core';
import {
  LoadTemplateInput,
  TemplateLoader,
  Partial,
} from '@vendure/email-plugin';
import path from 'path';
import fs from 'fs/promises';

export class CustomTemplateLoader implements TemplateLoader {
  constructor(private templatePath: string) {}

  /**
   * Load a Handlebars template based on channel token
   */
  async loadTemplate(
    _injector: Injector,
    ctx: RequestContext,
    input: LoadTemplateInput
  ): Promise<string> {
    let templateFileName = `body.hbs`;
    switch (ctx.channel.token) {
      case 'wkw-default':
        templateFileName = `wkw.hbs`;
      default:
        templateFileName = `body.hbs`;
    }
    const templatePath = path.join(
      this.templatePath,
      input.type,
      templateFileName
    );
    return await fs.readFile(templatePath, 'utf-8');
  }

  /**
   * Always load all partials, so that they are available to all templates for inclusion
   */
  async loadPartials(): Promise<Partial[]> {
    const partialsPath = path.join(this.templatePath, 'partials');
    const partialsFiles = await fs.readdir(partialsPath);
    return Promise.all(
      partialsFiles.map(async (file) => {
        return {
          name: path.basename(file, '.hbs'),
          content: await fs.readFile(path.join(partialsPath, file), 'utf-8'),
        };
      })
    );
  }
}

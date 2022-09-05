/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { emailTemplate } from '../helpers';
import { main } from '../config';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const message = await this.contactService.create(createContactDto);
      if (message) {
        const htmlMessage = emailTemplate(message);
        main(message.email, htmlMessage, message.message);
        return 'message';
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }
}

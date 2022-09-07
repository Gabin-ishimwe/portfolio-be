/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
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
        return message;
      }
    } catch (error) {
      // throw error
      throw new NotFoundException();
    }
  }

  @Get()
  async findAll() {
    try {
      const messages = this.contactService.findAll();
      return messages;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete()
  async Delete() {
    return this.contactService.deleteAll();
  }
}

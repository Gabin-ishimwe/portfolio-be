/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  create(createContactDto: CreateContactDto) {
    const { firstName, lastName, email, message } = createContactDto;
    return this.prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });
  }

  findAll() {
    return this.prisma.contact.findMany();
  }
}

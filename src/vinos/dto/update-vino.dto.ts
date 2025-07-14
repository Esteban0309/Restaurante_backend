import { PartialType } from '@nestjs/mapped-types';
import { CreateVinoDto } from './create-vino.dto';

export class UpdateVinoDto extends PartialType(CreateVinoDto) {}

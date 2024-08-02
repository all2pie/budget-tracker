import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/types/user-type.enum';
import { AddExpenseDto } from './dto/add-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseService } from './expense.service';

@ApiBearerAuth()
@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private service: ExpenseService) {}

  @Roles(Role.User)
  @Post()
  add(@Body() data: AddExpenseDto, @UserId() userId: string) {
    return this.service.add(data, userId);
  }

  @Roles(Role.User)
  @Get()
  getAll(@UserId() userId: string) {
    return this.service.getAll(userId);
  }

  @Roles(Role.Admin)
  @Get('allUsersExpenses')
  getAllForAdmin() {
    // TODO
  }

  @Roles(Role.User)
  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Roles(Role.User)
  @Patch(':id')
  update(@Body() data: UpdateExpenseDto, @Param('id') id: string) {
    return this.service.update(id, data);
  }

  @Roles(Role.User)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

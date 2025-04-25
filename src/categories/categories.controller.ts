import { Controller, Post, Body, UseGuards, Get, Put, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    create(@Body('name') name: string) {
        return this.categoriesService.create(name);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    update(@Param('id') id: string, @Body('name') name: string) {
        return this.categoriesService.update(id, name);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoriesService.delete(id);
    }
}
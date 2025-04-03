import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseFilters,
  } from '@nestjs/common';
  import { PlacesService } from './places.service';
  import { CreatePlaceDto} from './dtos/request/create-place';
  import { UpdatePlaceDto } from './dtos/request/update-place';
  import { PlaceResponseDto } from './dtos/response/response';
  import { plainToInstance } from 'class-transformer';
  import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
  import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
  } from '@nestjs/swagger';
import { Put } from '@nestjs/common';
  
  @ApiTags('places')
  @Controller('places')
  @UseFilters(HttpExceptionFilter)
  export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cria um novo local para visitar' })
    @ApiCreatedResponse({ type: PlaceResponseDto })
    @ApiBadRequestResponse({ description: 'Dados inválidos fornecidos' })
    @ApiConflictResponse({ description: 'Local já existe no país especificado' })
    async create(
      @Body() createPlaceDto: CreatePlaceDto,
    ): Promise<PlaceResponseDto> {
      const place = await this.placesService.create(createPlaceDto);
      return plainToInstance(PlaceResponseDto, place);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lista todos os locais ordenados por meta' })
    @ApiResponse({
      status: 200,
      type: [PlaceResponseDto],
    })
    async findAll(): Promise<PlaceResponseDto[]> {
      const places = await this.placesService.findAll();
      return plainToInstance(PlaceResponseDto, places);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Busca um local pelo ID' })
    @ApiResponse({ status: 200, type: PlaceResponseDto })
    @ApiNotFoundResponse({ description: 'Local não encontrado' })
    async findOne(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<PlaceResponseDto> {
      const place = await this.placesService.findOne(id);
      return plainToInstance(PlaceResponseDto, place);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Atualiza parcialmente um local' })
    @ApiResponse({ status: 200, type: PlaceResponseDto })
    @ApiNotFoundResponse({ description: 'Local não encontrado' })
    @ApiBadRequestResponse({ description: 'Dados de atualização inválidos' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePlaceDto: UpdatePlaceDto,
    ): Promise<PlaceResponseDto> {
      const updatedPlace = await this.placesService.update(id, updatePlaceDto);
      return plainToInstance(PlaceResponseDto, updatedPlace);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove um local' })
    @ApiResponse({ status: 204 })
    @ApiNotFoundResponse({ description: 'Local não encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this.placesService.remove(id);
    }
  }
import { 
    BadRequestException,
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from 'src/places/dtos/request/create-place';
import { UpdatePlaceDto } from 'src/places/dtos/request/update-place';
import { Place } from './entities/place.entity';
import * as moment from 'moment';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly placesRepository: Repository<Place>,
    ) {}

    async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
        if (!moment(createPlaceDto.goal, 'YYYY-MM', true).isValid()) {
            throw new BadRequestException('O campo goal deve estar no formato YYYY-MM');
        }

        const formattedGoal = new Date(`${createPlaceDto.goal}-01T00:00:00Z`);

        const newPlace = this.placesRepository.create({
            ...createPlaceDto,
            goal: formattedGoal, 
        });
    
        return this.placesRepository.save(newPlace);
    }

    async findAll(): Promise<Place[]> {
        const places = await this.placesRepository.find({ order: { goal: 'ASC' } });

        return places.map(place => ({
            ...place,
            goal: new Date(place.goal),
        }));
    }
    

    async findOne(id: number): Promise<Place> {
        const place = await this.placesRepository.findOne({ where: { id } });
        
        if (!place) {
        throw new NotFoundException(`Local com ID ${id} não encontrado`);
        }
        
        return place;
    }

    async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
        if (Object.keys(updatePlaceDto).length === 0) {
            throw new BadRequestException('Nenhum campo válido para atualização foi fornecido');
        }

        if (!moment(updatePlaceDto.goal, 'YYYY-MM', true).isValid()) {
            throw new BadRequestException('O campo goal deve estar no formato YYYY-MM');
        }

        const formattedGoal = new Date(`${updatePlaceDto.goal}-01T00:00:00Z`);

        const place = await this.findOne(id);
        Object.assign(place, updatePlaceDto);
        place.goal = formattedGoal;
        return this.placesRepository.save(place);
    }

    async remove(id: number): Promise<void> {
        const result = await this.placesRepository.delete(id);
        
        if (result.affected === 0) {
        throw new NotFoundException(`Local com ID ${id} não encontrado`);
        }
    }
}
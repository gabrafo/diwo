import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from '../places/dtos/request/create-place';
import { UpdatePlaceDto } from '../places/dtos/request/update-place';
import * as moment from 'moment';

describe('PlacesService', () => {
  let service: PlacesService;
  let repository: Repository<Place>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    repository = module.get<Repository<Place>>(getRepositoryToken(Place));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw BadRequestException for invalid goal format', async () => {
      const invalidDto: CreatePlaceDto = {
        country: 'France',
        location: 'Paris',
        goal: '2023-13',
        flagUrl: 'https://flagcdn.com/fr.svg',
      };

      await expect(service.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a new place with valid data', async () => {
      const validDto: CreatePlaceDto = {
        country: 'France',
        location: 'Paris',
        goal: '2023-12',
        flagUrl: 'https://flagcdn.com/fr.svg',
      };
      
      const expectedDate = new Date('2023-12-01T00:00:00Z');
      const mockPlace = { 
        id: 1, 
        ...validDto, 
        goal: expectedDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(mockPlace);
      mockRepository.save.mockResolvedValue(mockPlace);

      const result = await service.create(validDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...validDto,
        goal: expectedDate,
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockPlace);
    });
  });

  describe('findAll', () => {
    it('should return places sorted by goal ascending', async () => {
      const mockPlaces = [
        { 
          id: 1, 
          country: 'France',
          location: 'Paris',
          goal: new Date('2023-12-01'),
          flagUrl: 'https://flagcdn.com/fr.svg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          id: 2, 
          country: 'Japan',
          location: 'Tokyo',
          goal: new Date('2023-11-01'),
          flagUrl: 'https://flagcdn.com/jp.svg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.find.mockResolvedValue(mockPlaces);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { goal: 'ASC' },
      });
      expect(result).toEqual(mockPlaces);
    });
  });

  describe('findOne', () => {
    it('should return a place by id', async () => {
      const mockPlace = { 
        id: 1, 
        country: 'France',
        location: 'Paris',
        goal: new Date('2023-12-01'),
        flagUrl: 'https://flagcdn.com/fr.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockRepository.findOne.mockResolvedValue(mockPlace);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockPlace);
    });

    it('should throw NotFoundException if place not found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const existingPlace = {
      id: 1,
      country: 'France',
      location: 'Paris',
      goal: new Date('2023-12-01'),
      flagUrl: 'https://flagcdn.com/fr.svg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    beforeEach(() => {
      jest.spyOn(service, 'findOne').mockResolvedValue(existingPlace);
    });

    it('should throw BadRequestException for empty update body', async () => {
      await expect(service.update(1, {} as UpdatePlaceDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should update place with valid data', async () => {
      const updateDto: UpdatePlaceDto = {
        location: 'Lyon',
        goal: '2024-01',
      };
      
      const expectedDate = new Date('2024-01-01T00:00:00Z');
      const updatedPlace = { 
        ...existingPlace, 
        ...updateDto, 
        goal: expectedDate,
        updatedAt: new Date(),
      };

      mockRepository.save.mockResolvedValue(updatedPlace);

      const result = await service.update(1, updateDto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...existingPlace,
        ...updateDto,
        goal: expectedDate,
      });
      expect(result).toEqual(updatedPlace);
    });

    it('should throw BadRequestException for invalid goal format', async () => {
    const invalidDto: UpdatePlaceDto = { 
        goal: '2024-13',
    };

    await expect(service.update(1, invalidDto)).rejects.toThrow(
        BadRequestException,
    );
    });
  });

  describe('remove', () => {
    it('should delete a place', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if place not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
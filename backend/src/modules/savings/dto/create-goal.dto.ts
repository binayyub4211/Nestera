import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsObject,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SavingsGoalMetadata } from '../entities/savings-goal.entity';

export class CreateGoalDto {
  @ApiProperty({
    example: 'Buy a Car',
    description: 'Human-readable label for the savings goal',
  })
  @IsString()
  @MaxLength(255)
  goalName: string;

  @ApiProperty({
    example: 50000,
    description: 'Target amount to accumulate (in XLM)',
  })
  @IsNumber()
  @Min(0.01)
  targetAmount: number;

  @ApiProperty({
    example: '2026-12-31',
    description: 'Target date to reach the goal',
  })
  @IsDate()
  @Type(() => Date)
  targetDate: Date;

  @ApiProperty({
    example: {
      imageUrl: 'https://cdn.nestera.io/goals/car.jpg',
      iconRef: 'car-icon',
      color: '#4F46E5',
    },
    description:
      'Optional frontend-controlled metadata (imageUrl, iconRef, color, etc.)',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: SavingsGoalMetadata;
}

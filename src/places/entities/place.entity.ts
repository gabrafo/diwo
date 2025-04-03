import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['country', 'location']) // Restrição composta
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  goal: Date;

  @Column()
  flagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("shortUrl")
export class shortURL {
  @PrimaryGeneratedColumn("uuid")
  urlId: string;

  @Column("text")
  longUrl: string;

  @Index("ShortUrl_IDX")
  @Column("text")
  shortUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

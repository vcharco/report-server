import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("countries_pkey", ["id"], { unique: true })
@Entity("countries", { schema: "public" })
export class Countries {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "iso2" })
  iso2: string;

  @Column("text", { name: "iso3", nullable: true })
  iso3: string | null;

  @Column("text", { name: "local_name", nullable: true })
  localName: string | null;

  @Column("enum", {
    name: "continent",
    nullable: true,
    enum: [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "Oceania",
      "North America",
      "South America",
    ],
  })
  continent:
    | "Africa"
    | "Antarctica"
    | "Asia"
    | "Europe"
    | "Oceania"
    | "North America"
    | "South America"
    | null;
}

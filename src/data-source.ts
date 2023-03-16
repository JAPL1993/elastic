import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "162.214.164.60",
  port: 3306,
  username: "faguiar_back_laravel",
  password: "compufax_back",
  database: "faguiar_back_laravel_compras",
  synchronize: false,
});

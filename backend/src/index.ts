import { AppDataSource } from "./config/datasource";

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    // Chay ung dung tai day  (vd: khoi dong server, xu ly API, v.v.)
  } catch (error) {
    console.error("Error during database initialization", error);
  }
})();

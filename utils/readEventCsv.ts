import fs from "fs";

import { parse } from "csv-parse";

export async function readCSVFile<T>(
  filePath: string,
  columnNames: string[]
): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ",",
          columns: columnNames,
        })
      )
      .on("data", (data: T) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export const config: Config = {
  port: parseInt(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
  mongoDbUri: process.env.MONGO_URI || 'mongodb://localhost/budget-tracker',
};

export class Config {
  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsString()
  @IsNotEmpty()
  mongoDbUri: string;
}

function validate() {
  const validatedConfig = plainToInstance(Config, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

validate();

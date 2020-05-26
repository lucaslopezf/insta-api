import Knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('../../knexfile');
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

export const connectDb = (): void => {
  const knex = Knex(knexConfig.cienciaArgDb);
  Model.knex(knex);
};

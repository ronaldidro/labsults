import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'
import { DATABASE_URL, PRD_MODE } from '../utils/config.js'
import { error, info } from '../utils/logger.js'

const options = PRD_MODE
  ? {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
          require: true
        }
      }
    }
  : {}

const sequelize = new Sequelize(DATABASE_URL, options)

const migrationConf = {
  migrations: {
    glob: 'src/api/db/migrations/*.cjs',
    resolve: ({ name, path, context }) => {
      const migration = import(path)
      return {
        name,
        up: async () => (await migration).up(context),
        down: async () => (await migration).down(context)
      }
    }
  },
  storage: new SequelizeStorage({ sequelize, modelName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const seedConf = {
  migrations: {
    glob: 'src/api/db/seeders/*.cjs',
    resolve: ({ name, path, context }) => {
      const seed = import(path)
      return {
        name,
        up: async () => (await seed).up(context),
        down: async () => (await seed).down(context)
      }
    }
  },
  storage: new SequelizeStorage({ sequelize, modelName: 'seeders' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  info('Migrations up to date', {
    files: migrations.map(migration => migration.name)
  })
}

const runSeeds = async () => {
  const seeder = new Umzug(seedConf)
  const seeds = await seeder.up()
  info('Seeds up to date', {
    files: seeds.map(seed => seed.name)
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    await runSeeds()
    info('Connected to the database')
  } catch (err) {
    error(`Failed to connect to the database: ${err}`)
    return process.exit(1)
  }

  return null
}

export { connectToDatabase, sequelize }

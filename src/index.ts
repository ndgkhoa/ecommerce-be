import app from '~/app'
import connectDB from '~/config/database'
import config from '~/config/env'
import logger from '~/config/logger'

connectDB()

app.listen(config.PORT, () => {
  logger.info(`Start listening on ${config.PORT}`)
})

export default app

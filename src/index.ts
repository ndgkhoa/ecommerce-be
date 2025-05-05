import app from '~/app'
import logger from '~/config/logger'
import connectDB from '~/config/database'
import config from '~/config/env'

connectDB()

app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`)
})

export default app

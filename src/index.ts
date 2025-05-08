import app from '~/app'
import connectDB from '~/config/database'
import config from '~/config/env'

connectDB()

app.listen(config.PORT, () => {
  console.log(`Start listening on ${config.PORT}`)
})

export default app

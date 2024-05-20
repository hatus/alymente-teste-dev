import * as crypto from 'node:crypto'

import multer from 'fastify-multer'

import { env } from '@/env'

function generateFileName(input: string) {
  const hash = crypto.createHash('sha256')
  hash.update(input)
  return hash.digest('hex')
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, env.UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const filename = generateFileName(
      file.fieldname + Date.now() + Math.random(),
    )

    cb(null, filename + '.' + ext)
  },
})

const upload = multer({ storage })

export { multer, upload }

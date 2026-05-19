const protect = (req, res, next) => {

  const userId =
    req.headers.userid

  if (!userId) {

    return res.status(401).json({
      message:
        'Unauthorized user'
    })

  }

  req.userId = userId

  next()
}

module.exports = protect
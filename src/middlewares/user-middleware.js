const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        })
    }
    next();
}
module.exports = {
    validateIsAdminRequest,
}
import httpStatus from "http-status";

export function handleApplicationErrors(err, _req, res, next) {
    if (err.name === 'InvalidDataError') {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: err.message,
        });
    }

    if (err.name === 'ConflictError') {
        return res.status(httpStatus.CONFLICT).send({
            message: err.message,
        });
    }
    
    if (err.name === 'schemaError') {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
            message: err.message,
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        });
    }

    if (err.hasOwnProperty('status') && err.name === 'RequestError') {
        return res.status((err).status).send({
            message: err.message,
        });
    }

    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'InternalServerError',
        message: 'Internal Server Error',
    });
}
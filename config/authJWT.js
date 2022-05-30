const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
    console.log(req.headers.authorization);
    console.log(req.headers.refresh);
    //console.log(req.headers.authorization);
    if (req.headers.authorization) {
        // header에서 access token을 가져옵니다.
        const token = req.headers.authorization.split('Bearer ')[1];
        const result = verify(token);
        if (result.ok) {
            console.log('ok')
            req.id = result.id;
            req.role = result.role;
            next();
        } else {
            console.log('401')
            res.status(401).send({
                ok: false,
                message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
            });
        }
    }
}

module.exports = authJWT;
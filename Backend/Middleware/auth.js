import jwt from 'jsonwebtoken'
import SignupModel from '../Models/SignUpModel.js'

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'shahwar_secret_key_123')
        req.userRole = decoded.role
        next()
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' })
    }
}

export function checkPermission(module, action) {
    return async function (req, res, next) {
        try {

            if (req.userRole === 'Admin') return next()

            const user = await SignupModel.findById(req.userId)
            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' })
            }

            const perms = user.permissions || {}
            const allowed = perms[module] && perms[module][action] === true

            if (!allowed) {
                return res.status(403).json({ success: false, message: 'Permission denied' })
            }
            next()
        } catch (err) {
            return res.status(500).json({ success: false, message: 'Server error' })
        }
    }
}
import jwt from 'jsonwebtoken'
import SignupModel from '../Models/SignUpModel.js'

// 1. Token verify karo — user logged in hai?
export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'shahwar_secret_key_123')   // wahi secret jo signin me
        req.userId = decoded.id
        req.userRole = decoded.role
        next()
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' })
    }
}

// 2. Permission check karo — user ke paas ye action allowed hai?
export function checkPermission(module, action) {
    return async function (req, res, next) {
        try {
            // Admin ko sab allowed
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
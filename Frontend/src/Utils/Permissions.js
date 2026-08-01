export function getUser() {
    try {
        return JSON.parse(localStorage.getItem("user")) || null
    } catch {
        return null
    }
}


export function can(module, action) {
    const user = getUser()
    if (!user) return false

    if (user.role === "Admin") return true

    const perms = user.permissions || {}
    return perms[module]?.[action] === true
}

export function canSub(module, subKey) {
    const user = getUser()
    if (!user) return false

    // Admin ko sab
    if (user.role === "Admin") return true

    const perms = user.permissions || {}
    return perms[module]?.subMenus?.[subKey] === true
}
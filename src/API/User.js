export const getUsers = async () => {
    const userURL = 'http://localhost:3000/users/'
    try {
        const response = await fetch(userURL)
        const userList = await response.json()
        return userList
    } catch (error) {
        console.error("error", error)
    }
}
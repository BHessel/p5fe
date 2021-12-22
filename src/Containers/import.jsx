//this will be my import file

    //fetch all videos
    // const url = 'http://localhost:3000/videos'

    //     const fetchVideos = async () => {
    //         try {
    //             const response = await fetch(url)
    //             const videoList = await response.json()
    //             setVideos(videoList)
    //         } catch (error) {
    //             console.log("error", error)
    //         }
    //     }


    //fetch all users
    export const getUsers = async () => {
        const userURL = 'http://localhost:3000/users/'
        try {
                const response = await fetch(userURL)
                const userList = await response.json()
                console.log('importPage list', userList)
                return userList
            } catch (error) {
                console.log("error", error)
            }
    }

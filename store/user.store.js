import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

const useUserStore = create(
    persist(
        combine (
           {
            user: null,
            bookings: [],
            token: null,
           },
           (set) => ({
            isAuth: () => (user !== null),
            register: async(userData) => {

                const response = await fetch('http://localhost/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: {
                    //     name: userData.name,
                    //     last_name: userData.last_name,
                    //     email: userData.email,
                    //     password: userData.password,
                    //     password_confirm: userDataPassword_confirm
                    // }
                    body: JSON.stringify(userData)
                })

                const data = await response.json()

                if(response.status === 201) {
                    set({user: data.user, token: data.user_token})
                }
            } 
           })
        ),
        {
            name: 'location-storage'
        }
    )
)

export default useLocationStore
import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

const useLocationStore = create(
    persist(
        combine (
           {
            locations: [],
            selectedLocation: null,
           },
           (set) => ({
            loadLocations: async () => {
                    const response = await fetch('http://localhost/api/locations')
                    const data = await response.json()
                    set({locations: data})
            }
           })
        ),
        {
            name: 'location-storage'
        }
    )
)

export default useLocationStore
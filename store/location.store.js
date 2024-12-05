import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { apiEndpoint } from '../configs/routes.config'

const useLocationStore = create(
    persist(
        combine (
           {
            locations: [],
            availableTimeSlots: [],
            currentLocation: null,
           },
           (set, get) => ({
            loadLocations: async () => {
                    const response = await fetch(apiEndpoint.locations.index, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                    const data = await response.json()
                    set({locations: data})
            },
            setCurrentLocation: (location) => {
                set({currentLocation: location})
            },

            loadTimeSlotsByDate: async (date) => {
                const response = await fetch(`${apiEndpoint.locations.index}/${get().currentLocation.id}?date=${date}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                const data = await response.json()
                set({availableTimeSlots: data})
            },
           })

        ),
        {
            name: 'location-storage'
        }
    )
)

export default useLocationStore
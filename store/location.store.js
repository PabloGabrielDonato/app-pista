import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import { apiEndpoint } from '../configs/routes.config'

const useLocationStore = create(
    persist(
        combine(
            {
                errors: null, // Almacena el mensaje de error
                locations: [],
                availableTimeSlots: [],
                currentLocation: null,
            },
            (set, get) => ({
                loadLocations: async () => {
                    try {
                        const response = await fetch(apiEndpoint.locations.index, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                        });

                        if (!response.ok) {
                            const errorText = `Error ${response.status}: ${response.statusText}`;
                            set({ errors: errorText, locations: [] });
                            return;
                        }

                        const data = await response.json();
                        set({ locations: data, errors: null }); // Limpia errores si la solicitud es exitosa
                    } catch (error) {
                        set({ errors: error.message, locations: [] }); // Captura errores de red o de ejecución
                        console.error('Failed to load locations:', error);
                    }
                },

                setCurrentLocation: (location) => {
                    set({ currentLocation: location });
                },

                loadTimeSlotsByDate: async (date) => {
                    console.log (date)
                    if(date == null){
                        set({ errors: null, availableTimeSlots: [] });
                        return;
                    }
                    const currentLocation = get().currentLocation;
                    if (!currentLocation) {
                        set({ errors: 'No location selected', availableTimeSlots: [] });
                        return;
                    }

                    const url = `${apiEndpoint.locations.index}/${currentLocation.id}/availability?date=${date}`;

                    try {
                        const response = await fetch(url, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                        });

                        if (!response.ok) {
                            const errorText = `Error ${response.status}: ${response.statusText}`;
                            set({ errors: errorText, availableTimeSlots: [] });
                            return;
                        }

                        const data = await response.json();
                        console.log('data', data);
                        
                        set({ availableTimeSlots: data, errors: null }); // Limpia errores si la solicitud es exitosa
                    } catch (error) {
                        set({ errors: error.message, availableTimeSlots: [] }); // Captura errores de red o de ejecución
                        console.error('Failed to load time slots:', error);
                    }
                },
            })
        ),
        {
            name: 'location-storage', // Nombre para el almacenamiento persistente
        }
    )
);

export default useLocationStore;

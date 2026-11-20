import { useQuery } from '@tanstack/react-query'
import { savedConfigurationsApi } from './api'

export const useSavedConfigurations = () =>
    useQuery({
        queryKey: ['saved-configurations'],
        queryFn: savedConfigurationsApi.getSavedConfigurations,
    })

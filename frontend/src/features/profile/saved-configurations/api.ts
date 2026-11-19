import { http } from '../../../api/http'
import type { SavedConfigurationDTO } from './types'

export const savedConfigurationsApi = {
    getSavedConfigurations: () => http<SavedConfigurationDTO[]>('/customer/saved-configurations'),
}

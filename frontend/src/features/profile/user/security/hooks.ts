import { useMutation } from '@tanstack/react-query'
import { securityApi } from './api'

export const useChangePassword = () =>
    useMutation({
        mutationFn: securityApi.changePassword,
    })

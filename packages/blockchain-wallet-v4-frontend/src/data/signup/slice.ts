import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Remote } from '@core'

import { PlatformTypes, ProductAuthOptions } from '../auth/types'
import {
  MetadataRestoreType,
  ProductSignupMetadata,
  RegisteringFailureType,
  RegisteringSuccessType,
  RestoringType,
  SignupRedirectTypes,
  SignupStateType
} from './types'

const initialState: SignupStateType = {
  firstLogin: false,
  isValidReferralCode: undefined,
  kycReset: undefined,
  metadataRestore: Remote.NotAsked,
  productSignupMetadata: {},
  registerEmail: undefined,
  registering: Remote.NotAsked,
  resetAccount: false,
  restoring: Remote.NotAsked,
  signupCountry: undefined
}

const signupSlice = createSlice({
  initialState,
  name: 'signup',
  reducers: {
    initializeSignup: () => {},
    register: (state, action) => {},
    registerFailure: (state, action: PayloadAction<RegisteringFailureType>) => {
      state.registering = Remote.Failure(action.payload)
    },
    registerLoading: (state) => {
      state.registering = Remote.Loading
    },
    registerSuccess: (state, action: PayloadAction<RegisteringSuccessType>) => {
      state.registering = Remote.Success(action.payload)
    },
    resetAccount: (state, action) => {},
    restore: (state, action) => {},
    restoreFailure: () => {},
    restoreFromMetadata: (state, action) => {},
    restoreFromMetadataFailure: (state, action: PayloadAction<string>) => {
      state.metadataRestore = Remote.Failure(action.payload)
    },
    restoreFromMetadataLoading: (state) => {
      state.metadataRestore = Remote.Loading
    },
    restoreFromMetadataSuccess: (state, action: PayloadAction<MetadataRestoreType>) => {
      state.metadataRestore = Remote.Success(action.payload)
    },
    restoreLoading: (state) => {
      state.restoring = Remote.Loading
    },
    restoreSuccess: (state, action: PayloadAction<RestoringType>) => {
      state.restoring = Remote.Success(action.payload)
    },
    setFirstLogin: (state, action: PayloadAction<SignupStateType['firstLogin']>) => {
      state.firstLogin = action.payload
    },
    setIsValidReferralCode: (
      state,
      action: PayloadAction<SignupStateType['isValidReferralCode']>
    ) => {
      state.isValidReferralCode = action.payload
    },
    setKycResetStatus: (state, action: PayloadAction<SignupStateType['kycReset']>) => {
      state.kycReset = action.payload
    },
    setProductSignupMetadata: (state, action: PayloadAction<ProductSignupMetadata>) => {
      const { platform, product, referrerUsername, signupRedirect, tuneTid } = action.payload
      state.productSignupMetadata = {
        platform: platform?.toUpperCase() as PlatformTypes,
        product: product?.toUpperCase() as ProductAuthOptions,
        referrerUsername,
        signupRedirect: signupRedirect?.toUpperCase() as SignupRedirectTypes,
        tuneTid
      }
    },
    setRegisterEmail: (state, action: PayloadAction<SignupStateType['registerEmail']>) => {
      state.registerEmail = action.payload
    },
    setResetAccount: (state, action: PayloadAction<SignupStateType['resetAccount']>) => {
      state.resetAccount = action.payload
    },
    setResetLogin: (state, action: PayloadAction<SignupStateType['resetAccount']>) => {
      state.resetAccount = action.payload
    },
    setSignupCountry: (state, action: PayloadAction<SignupStateType['signupCountry']>) => {
      state.signupCountry = action.payload
    }
  }
})

export const { actions } = signupSlice
export const signupReducer = signupSlice.reducer

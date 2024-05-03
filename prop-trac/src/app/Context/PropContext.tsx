import { IProperties, PropInfo } from '@/Interfaces/Interfaces'
import React, { createContext } from 'react'

export const PropContext = createContext<IProperties[] | undefined>(undefined)
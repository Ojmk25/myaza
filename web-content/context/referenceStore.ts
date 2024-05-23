// import { Reducer } from 'react'
// import { AskBettyRefProps, DrawerEvent } from '../utilities/propTypes'
// import { Questions } from 'containers/WhoIsItForSection/WhoIsItForSection'

// export interface referenceInitialStateProps {
//   reference: AskBettyRefProps
//   save_recommendation_modal: boolean
//   saved_recommendation: SavedRecommendation
// }
// interface SavedRecommendation {
//   id: string
//   name: string
// }
// export type ReferenceAction =
//   | {
//       type: 'SET_EVENTS_DATA'
//       payload: DrawerEvent
//     }
//   | {
//       type: 'SET_BUDGET_DATA'
//       payload: { minimum: number; maximum: number; currency: string }
//     }
//   | { type: 'SET_GIFT_PREFERENCE'; payload: string[] }
//   | { type: 'SET_RECOMMENDATION_PREFERENCE'; payload: string }
//   | { type: 'SET_WHO_IS_IT_FOR'; payload: string[] }
//   | { type: 'SET_SELECTED_RECIPIENT'; payload: Questions[] }
//   | { type: 'SET_ABOUT_GIFT_RECEIVER'; payload: string }
//   | { type: 'SAVE_RECOMMENDATION_MODAL'; payload: boolean }
//   | { type: 'SAVED_RECOMMENDATION'; payload: SavedRecommendation }

// export const SAVE_RECOMMENDATION_MODAL = 'SAVE_RECOMMENDATION_MODAL'
// export const SET_EVENTS_DATA = 'SET_EVENTS_DATA'
// export const SET_BUDGET_DATA = 'SET_BUDGET_DATA'
// export const SET_GIFT_PREFERENCE = 'SET_GIFT_PREFERENCE'
// export const SET_WHO_IS_IT_FOR = 'SET_WHO_IS_IT_FOR'
// export const SET_SELECTED_RECIPIENT = 'SET_SELECTED_RECIPIENT'
// export const SAVED_RECOMMENDATION = 'SAVED_RECOMMENDATION'
// type ReferenceReducer = Reducer<referenceInitialStateProps, ReferenceAction>

// export const referenceInitialState: referenceInitialStateProps = {
//   reference: {
//     events: {
//       id: '',
//       eventName: '',
//     },
//     budget: {
//       minimum: 0,
//       maximum: 0,
//       currency: 'POUND',
//     },
//     gift_preference: ['Single Item'],
//     recommendationPreference: '',
//     who_is_it_for: [],
//     about_gift_receiver: '',
//     recommendedGiftsId: [],
//     recipient: '',
//     selectedRecipientdata: [],
//   },
//   save_recommendation_modal: false,
//   saved_recommendation: {
//     name: '',
//     id: '',
//   },
// }

// const referenceStoreReducer: ReferenceReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_EVENTS_DATA':
//       return {
//         ...state,
//         reference: {
//           ...state.reference,
//           events: {
//             ...state.reference.events,
//             ...action.payload,
//           },
//         },
//       }
//     case 'SET_BUDGET_DATA':
//       return {
//         ...state,
//         reference: {
//           ...state.reference,
//           budget: {
//             ...state.reference.budget,
//             ...action.payload,
//           },
//         },
//       }
//     case 'SET_GIFT_PREFERENCE':
//       return {
//         ...state,
//         reference: {
//           ...state.reference,
//           gift_preference: action.payload,
//         },
//       }
//     case 'SET_SELECTED_RECIPIENT':
//       return {
//         ...state,
//         reference: {
//           ...state.reference,
//           selectedRecipientdata: action.payload,
//         },
//       }
//     case 'SET_RECOMMENDATION_PREFERENCE':
//       return {
//         ...state,
//         recommendationPreference: action.payload,
//       }
//     case 'SET_WHO_IS_IT_FOR':
//       return {
//         ...state,
//         who_is_it_for: action.payload,
//       }
//     case 'SET_ABOUT_GIFT_RECEIVER':
//       return {
//         ...state,
//         about_gift_receiver: action.payload,
//       }
//     case SAVE_RECOMMENDATION_MODAL:
//       return {
//         ...state,
//         save_recommendation_modal: action.payload,
//       }
//     case SAVED_RECOMMENDATION:
//       return {
//         ...state,
//         saved_recommendation: action.payload,
//       }
//     default:
//       return state
//   }
// }

// export default referenceStoreReducer

// import { getApiPath } from '../config'
// import {
//   CreateSaveRecommendations,
//   RecommendationRemainderEmail,
//   SendResultToEmail,
// } from '../utilities/propTypes'
// import * as http from './httpService'
// const apiCreateRecommendation = getApiPath('core/user', 'save-recommendation')
// const apiSendRecommendation = getApiPath(
//   'core/user',
//   'send-recommendation-mail'
// )

// const apiRecommendationReminder = getApiPath(
//   'core/user',
//   'recommendation-reminder'
// )

// const apiListRecommendation = getApiPath('core/user', 'saved-recommendation')
// const apiDeteleRecommendation = getApiPath('core/user', 'delete-recommendation')
// const apiGetRecommendation = getApiPath(
//   'core/user',
//   'saved-recommendation-details'
// )
// const apiDeleteSingleProduct = getApiPath(
//   'core/user',
//   'delete-single-recommendation-item'
// )
// const apiDeleteMultipleProduct = getApiPath(
//   'core/user',
//   'delete-multiple-recommendation'
// )
// const apiEditRecommendation = getApiPath(
//   'core/user',
//   'edit-saved-recommendation-details'
// )
// export interface DeleteRecommendationProps {
//   userId: string
//   recommendationId: string
//   productId?: string | string[]
// }
// export const createRecommendation = async (
//   data: CreateSaveRecommendations,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiCreateRecommendation, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }

// //email
// export const sendRecommendationMail = async (
//   data: SendResultToEmail,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiSendRecommendation, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }

// //reminder
// export const recommendationRemainder = async (
//   data: RecommendationRemainderEmail,
//   token: string
//   // eslint-disable-next-line sonarjs/no-identical-functions
// ) => {
//   try {
//     return await http.apiCall.post(apiRecommendationReminder, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }

// // list
// export const listRecommendations = async (data: string, token: string) => {
//   try {
//     return await http.apiCall.get(`${apiListRecommendation}?userId=${data}`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }
// // Edit
// export const editRecommendation = async (
//   data: CreateSaveRecommendations,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiEditRecommendation, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }
// // delete
// export const deleteRecommendation = async (
//   data: DeleteRecommendationProps,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiDeteleRecommendation, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }
// // Get
// export const getRecommendation = async (
//   data: DeleteRecommendationProps,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.get(
//       `${apiGetRecommendation}?userId=${data.userId}&recommendationId=${data.recommendationId}`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     )
//   } catch (error) {
//     return error
//   }
// }

// export const deleteSingleProduct = async (
//   data: DeleteRecommendationProps,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiDeleteSingleProduct, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }

// export const deleteMultipleProduct = async (
//   data: DeleteRecommendationProps,
//   token: string
// ) => {
//   try {
//     return await http.apiCall.post(apiDeleteMultipleProduct, data, {
//       headers: {
//         Authorization: token,
//       },
//     })
//   } catch (error) {
//     return error
//   }
// }

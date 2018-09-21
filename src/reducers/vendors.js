// users reducer
export default function vendors (state = {}, action) {
  switch (action.type) {
    case 'VENDORS_SAVE':
      console.log('vendors loaded')
      return action.vendors

    default:
      return state
  }
}

export default function search (state = {}, action) {
  switch (action.type) {
    case 'SEARCH_UPDATE':
      return action.params
    // initial state
    default:
      return state
  }
}

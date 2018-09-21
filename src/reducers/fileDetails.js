// users reducer
export default function fileDetails(state = {}, action) {
    switch (action.type) {
      case 'VENDORMAP_SET':
        console.log("fileName loaded");
        return {
            ...state,
            name: action.fileName
        };
  
      // initial state
      default:
        return state;
    }
  }
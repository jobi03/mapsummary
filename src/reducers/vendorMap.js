// users reducer
export default function vendorMap (state = [], action) {
  switch (action.type) {
    case 'VENDORMAP_SET':
      console.log('vendorMap loaded')
      return action.data
    case 'VENDORMAP_UPDATE':
      const result = []
      const _result = []
      state.forEach(company => {
        company.categories.forEach(el => {
          if (el.id === action.payload.id) {
            const intResult = []
            el.product.forEach(pro => {
              if (pro.productName === action.payload.params.productName) {
                intResult.push({
                  productName: action.payload.params.productName,
                  vendorName: action.payload.params.vendorName
                })
              } else {
                intResult.push({
                  productName: pro.productName,
                  vendorName: pro.vendorName
                })
              }
            })
            result.push({
              ...el,
              product: intResult
            })
            console.log('el', result)
          } else {
            result.push({
              ...el
            })
          }
        })
        _result.push({
          ...company,
          categories: result
        })
      })
      return _result

      case 'VENDORMAP_UPDATEALL':
      const productArray = []
      const _productArray = []
      console.log("target vendorMap ", action.payload.target)
      state.forEach(company => {
        company.categories.forEach(el => {
          if (el.id === action.payload.id) {
            const intResult = []
            el.product.forEach(pro => {
              intResult.push({
                productName: pro.productName,
                vendorName: action.payload.params.vendorName
              })
            })
            productArray.push({
              ...el,
              product: intResult
            })
            console.log('el', productArray)
          } else {
            productArray.push({
              ...el
            })
          }
        })
        _productArray.push({
          ...company,
          categories: productArray
        })
      })
      return _productArray

    case 'VENDORMAP_ADD':
      return [...state, action]

    case 'VENDORMAP_DELETE':
    // initial state
    default:
      return state
  }
}

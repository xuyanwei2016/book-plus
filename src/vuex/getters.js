let getters = {
  totalPrice:(state)=>state.cartList.reduce((prev,next)=>prev+next.count*next.bookPrice,0),
  list:(state)=>state.cartList
}

export default getters

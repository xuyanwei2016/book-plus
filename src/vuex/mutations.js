import * as Types from './mutation-types';
let mutations = {
  [Types.ADD_CART](state,book){
    let car= state.cartList.find(item=>item.bookId ==book.bookId);
    if(car){
      car.count++;
    }else{
      book.count = 1;
      state.cartList.push(book);
    }
  },
  [Types.CHANGE_COUNT](state,{id,count}){
    let cartList = [...state.cartList]
    let car= cartList.find(item=>item.bookId ==id);
    if(car.count+count>0){
      car.count += count;
      state.cartList = cartList;
    }
  },
  [Types.REMOVE_CART](state,id){
    state.cartList = state.cartList.filter(item=>item.bookId!=id);
  },
  [Types.CLEAR_CART](state,id){
    state.cartList = []
  },
};
export default mutations;

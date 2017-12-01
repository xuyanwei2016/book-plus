<template>
  <div>
    <MHeader>收藏</MHeader>
    <ul class="content">
      <li v-for="l in list">
        <img :src="l.bookCover" alt="">
        <div class="box">
          {{l.bookName}}
          <p>
            <button @click="add(l.bookId,-1)">-</button>
            {{l.count}}
            <button @click="add(l.bookId,1)">+</button>
          </p>
          <p>
            单价{{l.bookPrice}}
            小计{{(l.count*l.bookPrice).toFixed(2)}}
          </p>
          <button @click="remove(l.bookId)">删除</button>
        </div>
      </li>
      <li>
        <span>总价{{totalPrice}}</span> <button @click="clear">清空购物车</button>

      </li>
    </ul>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {mapState,mapMutations,mapGetters} from 'vuex';
  import * as Types from '../vuex/mutation-types'
    export default {
        data(){
            return {msg: 'hello'}
        },
        created(){
        },
        methods: {
          ...mapMutations([Types.CHANGE_COUNT,Types.REMOVE_CART,Types.CLEAR_CART]),
          add(id,count){
            this[Types.CHANGE_COUNT]({id,count});
          },
          remove(id){
            this[Types.REMOVE_CART](id);
          },
          clear(){
              this[Types.CLEAR_CART]()
          }
        },
        computed: {
          ...mapGetters(['totalPrice','list']),
        },
        components: {MHeader}
    }
</script>
<style scoped>
  img{width: 120px;}
  li {border-bottom: 1px solid #ccc;display: flex;height: 140px;}
  .box{font-size: 15px;font-weight: bold;padding: 10px}
  li:last-child{
    height: 30px;
    justify-content: space-around;
    line-height: 30px;
    border-bottom: none;
  }
</style>

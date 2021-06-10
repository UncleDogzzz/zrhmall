<template>
  <div class='warpper'>
    <ul>
      <li>123 </li><li>123 </li><li>123 </li><li>123 </li>
      <li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li>
      <li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li>
      <li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li><li>123 </li>
      <li>123 </li>
      <li>123 </li>
      <li>123 </li>
      <li>123 </li>
     </ul>
  </div>
</template>

<script>
  import BSscroll from 'better-scroll'

  export default{
    name:'Category',
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      new BSscroll(document.getElementsByClassName('warpper')[0],{
      })
    }
  }
</script>
<style>
  .warpper{
   height: 150px;
   overflow: hidden;


  }

</style>

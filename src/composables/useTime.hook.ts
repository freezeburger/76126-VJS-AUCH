import { onMounted, onUnmounted, ref } from "vue";

/**
 * Convention for naming composables: use + Functionality
 * "use" prefix indicates it's a composable
 * composables are reusable logic pieces in Vue.js
 * and can only be used inside setup() or other composables
 * 
 * A composable that provides the current time and logs it every second.
 * It also logs a message when the component using this composable is unmounted.
 * 
 */
export const useTime = () => {
   const time = ref(new Date().toLocaleTimeString());
   const timerRef = ref<number | null>(null);

   onMounted(() => {
      timerRef.value = setInterval(() => {
         time.value = new Date().toLocaleTimeString();
         // console.log(`Current time: ${time.value}`);
      }, 1000);
   });

   onUnmounted(() => {
      console.log('Header component has been unmounted.');
      clearInterval(timerRef.value!);
   });

   return {
      time
   };
};
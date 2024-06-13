import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useScroll } from '@vueuse/core';

export default {
  mounted(el) {
    const $el = $(el);
    const { y } = useScroll(window);
    const prevY = ref(y.value);
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollStep = scrollHeight / 2;
    
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        $el.addClass('fade-enter-active');
      } else {
        $el.removeClass('fade-enter-active');
      }
    };

    watch(y, (newY) => {
      const deltaY = newY - prevY.value;
      if (deltaY > 0) {
        // Scroll down by one third of the scrollHeight if scrolling down
        if (newY < scrollHeight / 3) {
          window.scrollTo({ top: scrollHeight / 3 });
        } else if (newY < (scrollHeight / 3) * 2) {
          window.scrollTo({ top: (scrollHeight / 3) * 2 });
        } else {
          window.scrollTo({ top: scrollHeight });
        }
      } else if (deltaY < 0) {
        // Scroll up by one third of the scrollHeight if scrolling up
        if (newY > (scrollHeight / 3) * 2) {
          window.scrollTo({ top: (scrollHeight / 3) * 2 });
        } else if (newY > scrollHeight / 3) {
          window.scrollTo({ top: scrollHeight / 3 });
        } else {
          window.scrollTo({ top: 0 });
        }
      }
      prevY.value = newY;
    });

    $(window).on('scroll', onScroll);
    el._onScroll = onScroll;
    onScroll(); // Trigger the scroll handler to set initial state
  },
  unmounted(el) {
    $(window).off('scroll', el._onScroll);
    delete el._onScroll;
  },
};

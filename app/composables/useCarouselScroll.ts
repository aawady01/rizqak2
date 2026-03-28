import type { Ref } from "vue";

interface UseCarouselScrollOptions {
  fallbackRatio?: number;
}

const resolveGap = (carousel: HTMLElement) => {
  const styles = window.getComputedStyle(carousel);
  const gap = styles.columnGap || styles.gap || "0";
  return Number.parseFloat(gap) || 0;
};

export const useCarouselScroll = (
  carouselRef: Ref<HTMLElement | null>,
  options: UseCarouselScrollOptions = {},
) => {
  const getScrollAmount = () => {
    const carousel = carouselRef.value;

    if (!carousel) {
      return 0;
    }

    const firstItem = carousel.firstElementChild as HTMLElement | null;

    if (firstItem) {
      return firstItem.getBoundingClientRect().width + resolveGap(carousel);
    }

    return carousel.clientWidth * (options.fallbackRatio ?? 0.85);
  };

  const scrollCarousel = (direction: 1 | -1) => {
    const carousel = carouselRef.value;

    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: direction * getScrollAmount(),
      behavior: "smooth",
    });
  };

  return {
    scrollCarousel,
  };
};

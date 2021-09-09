export default {
  methods: {
    initScrollAni() {
      gsap.utils.toArray("[data-scroll-parallax]").forEach((el, i) => {
        const start = el.getAttribute("data-scroll-start") || "top bottom";
        const horizontal =
          el.getAttribute("data-scroll-direction") === "horizontal";
        const speed = el.getAttribute("data-scroll-speed");
        const dist = speed ? Math.round(window.innerHeight * speed) : 1;
        const yDist = horizontal ? 0 : dist;
        const xDist = horizontal ? dist : 0;
        // const trigger = el.getAttribute("data-scroll-trigger") ?
        gsap.fromTo(
          el,
          { x: 0, y: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start,
              end: "bottom top",
              scrub: 0.1,
            },
            x: `${xDist}px`,
            y: `${yDist}px`,
            ease: "none",
          }
        );
      });
      gsap.utils.toArray("[data-scroll-reveal]").forEach((el, i) => {
        const once = !el.getAttribute("data-scroll-repeat");
        gsap.set(el, {
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100px",
            toggleClass: "is-inview",
            once,
          },
        });
      });
    },
  },
};

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
              scrub: 0.2,
            },
            x: `${xDist}px`,
            y: `${yDist}px`,
            ease: "none",
          }
        );
      });
      gsap.utils.toArray("[data-scroll-reveal]").forEach((el, i) => {
        const once = !el.getAttribute("data-scroll-repeat");
        const start =
          el.getAttribute("data-reveal-start") || "top bottom-=100px";
        const end = el.getAttribute("data-reveal-end") || "bottom top";
        gsap.set(el, {
          scrollTrigger: {
            trigger: el,
            start,
            end,
            toggleClass: "is-inview",
            once,
          },
        });
      });
    },
  },
};

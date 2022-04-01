import Carousel from './components/Carousel.svelte';

function registerComponent (component, name) {
  document.querySelectorAll(`.${CSS.escape(name)}`).forEach($el => {
    const props = JSON.parse($el.dataset.props);
    new component({
      target: $el,
      props,
      hydrate: true
    })
  })
}

registerComponent(Carousel, 'svelte--Carousel.svelte');

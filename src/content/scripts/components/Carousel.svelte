<script>
  import {onMount} from "svelte";
  import {flip} from "svelte/animate";
  // import {v4 as uuidv4} from "uuid";

  export let images;
  export let speed = 500;
  export let link;
  let controlColor = "#444";
  let displayControls = true;
  let marginOffset;
  let mounted = false;
  let disabled = false;

  const rotateLeft = (e) => {
    let transImg = images[images.length - 1];
    transImg.hide = true;
    disabled = true;
    images = [images[images.length - 1], ...images.slice(0, images.length - 1)];
    setTimeout(() => {
      transImg.hide = false;
      disabled = false;
      images = images;
    }, speed);
  };

  const rotateRight = (e) => {
    let transImg = images[0];
    transImg.hide = true;
    disabled = true;
    images = [...images.slice(1, images.length), images[0]];
    setTimeout(() => {
      transImg.hide = false;
      disabled = false;
      images = images;
    }, speed);
  };

  onMount(() => {
    mounted = true;
    if (typeof images == "string") {
      images = images.split(",");
    } else {
      images = [...images];
    }

    // let keys = [];
    // for (let i = 0; i < images.length; i++) {
    //   keys.push(uuidv4());
    // }

    if (images.length == 2) {
      images.push(images[0]);
      images.push(images[1]);
    }
    for (let i = 0; i < images.length; i++) {
      images[i] = {path: images[i].replace('pedals','pedalstmp'), hide: false};
    }
    if (images.length < 2) {
      displayControls = false;
    }
    marginOffset = images.length % 2 == 0 ? "50" : "0";

    if (images.length > 2) {
      let offset = images.length % 2 === 0 ? 1 : 0;
      for (let i = 0; i < Math.floor(images.length / 2) - offset; i++) {
        rotateLeft();
      }
    }
  });
</script>

{#if mounted}
  <div class="carousel-container">
    {#if link}
      <a href={link}>
        <div
          class="carousel-images"
          style="position: relative; left:{marginOffset}%"
        >
          {#each images as image (image)}
            <img
              loading="lazy"
              src={image.path}
              alt="slide"
              style="opacity: {image.hide ? 0 : 1};"
              animate:flip={{duration: speed}}
            />
          {/each}
        </div>
      </a>
    {:else}
      <div
        class="carousel-images"
        style="position: relative; left:{marginOffset}%"
      >
        {#each images as image (image)}
          <img
            loading="lazy"
            src={image.path}
            alt="slide"
            style="opacity: {image.hide ? 0 : 1};"
            animate:flip={{duration: speed}}
          />
        {/each}
      </div>
    {/if}
    {#if displayControls}
      <button class="left" on:click={rotateLeft} {disabled}>
        <svg
          width="20px"
          height="40px"
          transform={`rotate(180) scale(0.5)`}
          viewBox="0 0 20 40"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            style={`fill:${controlColor};`}
            d="m-.004 40 12.087-20L-.004 0h8.13l11.87 20-11.87 20z"
            aria-label="❮"
          /></svg
        >
      </button>
      <button class="right" on:click={rotateRight} {disabled}>
        <svg
          width="20px"
          height="40px"
          transform={`scale(0.5)`}
          viewBox="0 0 20 40"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            style={`fill:${controlColor};`}
            d="m-.004 40 12.087-20L-.004 0h8.13l11.87 20-11.87 20z"
            aria-label="❯"
          /></svg
        >
      </button>
    {/if}
  </div>
{/if}

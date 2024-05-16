<template>
    <div class="entry-container mb-3 pointer p-2">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Mayo</span>
            <span class="mx-2 fw-light">2024</span>
        </div>
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ab magnam quae eum ipsum sit. Laboriosam
            voluptates placeat nihil iste molestiae porro dicta totam perferendis, a perspiciatis possimus odio nemo?
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }
}
</style>
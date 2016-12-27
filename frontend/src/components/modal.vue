<template>
    <div class="modal-container" @click.self="$emit('closed')" v-show="show">
        <div class="modal-inner">
            <div class="modal">
                <nav>
                      <slot name='header'></slot>
                    <h1>
                        <a class="close" @click.self="$emit('closed')">✕</a>
                    </h1>
                </nav>
            <slot name='body'></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        show : {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang='scss'>
a {
  cursor: pointer
}
</style>


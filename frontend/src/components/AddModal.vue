<template>
    <div class="modal-container add">
        <div class="modal-inner">
            <div class="modal">
                <nav>
                    <h1>Add Link</h1>
                    <h1>
                        <a @click="$emit('close')">✕</a>
                    </h1>
                </nav>

                <form action="" method="post">
                    <!-- {% csrf_token %} -->
                    <!-- {% for field in form %} -->
                    <!-- {{ field.errors }} -->
                    <!-- {{ field }} -->
                    <!-- {% endfor %} -->
                    <input type="submit" value="Add">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add-modal',
}
</script>

<style>
a {
  cursor: pointer
}
</style>
